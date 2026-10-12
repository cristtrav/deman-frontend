import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { environment } from "@environment/environment";
import { ApiResponse } from "@shared/api-model/api-response.model";
import { SesionStore } from "../sesion.store";
import { SesionDTO } from "../../infrastructure/http/dto/sesion.dto";
import { SesionDTOMapper } from "../../infrastructure/http/mapper/sesion-dto.mapper";

@Injectable()
export class LoginFacade {
    private readonly http = inject(HttpClient);
    private readonly sesionStore = inject(SesionStore);
    private readonly url = `${environment.apiURL}/auth/login`;

    readonly status = signal<'initial' | 'saving' | 'success' | 'error'>('initial');
    readonly error = signal<string | null>(null);
    readonly isSaving = computed(() => this.status() == 'saving');

    login(ci: string, password: string) {
        this.status.set('saving');
        this.error.set(null);
        this.http.post<ApiResponse<SesionDTO>>(this.url, { ci, password })
        .subscribe({
            next: (resp) => {
                this.sesionStore.iniciar(SesionDTOMapper.toModel(resp.data));
                this.status.set('success');
            },
            error: (err: HttpErrorResponse) => {
                // status 0: servidor caído o sin red
                this.error.set(err.status === 0
                    ? 'No se pudo conectar con el servidor'
                    : err.error?.message ?? err.message);
                this.status.set('error');
            }
        });
    }
}
