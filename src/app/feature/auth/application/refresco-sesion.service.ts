import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, finalize, map, shareReplay, tap, throwError } from "rxjs";
import { environment } from "@environment/environment";
import { ApiResponse } from "@shared/api-model/api-response.model";
import { SesionStore } from "./sesion.store";
import { Sesion } from "../domain/model/sesion.model";
import { SesionDTO } from "../infrastructure/http/dto/sesion.dto";
import { SesionDTOMapper } from "../infrastructure/http/mapper/sesion-dto.mapper";

@Injectable({ providedIn: 'root' })
export class RefrescoSesionService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly sesionStore = inject(SesionStore);
    private readonly url = `${environment.apiURL}/auth/refresh`;

    // Las peticiones que necesitan renovar el token a la vez comparten una sola llamada
    private enCurso?: Observable<Sesion>;

    refrescar(): Observable<Sesion> {
        const sesion = this.sesionStore.sesion();
        if (sesion == null) return throwError(() => new Error('No hay una sesión iniciada'));

        this.enCurso ??= this.http.post<ApiResponse<SesionDTO>>(this.url, { refreshToken: sesion.refreshToken })
        .pipe(
            map(resp => SesionDTOMapper.toModel(resp.data)),
            tap(nueva => this.sesionStore.iniciar(nueva)),
            catchError((err: HttpErrorResponse) => {
                // Refresh token rechazado o usuario inactivo: la sesión ya no se puede recuperar.
                // Ante un error de red se conserva la sesión para reintentar más tarde.
                if (err.status === 400 || err.status === 401 || err.status === 403) this.expulsar();
                return throwError(() => err);
            }),
            finalize(() => this.enCurso = undefined),
            shareReplay({ bufferSize: 1, refCount: false })
        );
        return this.enCurso;
    }

    // Cierra la sesión y envía al login, volviendo luego a la página actual
    expulsar() {
        this.sesionStore.cerrar();
        const returnUrl = this.router.url;
        this.router.navigate(['/login'], {
            queryParams: returnUrl && !returnUrl.startsWith('/login') ? { returnUrl } : undefined
        });
    }
}
