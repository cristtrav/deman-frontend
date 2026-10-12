import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, map, of, switchMap, throwError } from "rxjs";
import { environment } from "@environment/environment";
import { SesionStore } from "../../application/sesion.store";
import { RefrescoSesionService } from "../../application/refresco-sesion.service";

// Se renueva el access token si le queda menos que este margen, para que no expire en tránsito
const MARGEN_EXPIRACION_MS = 30_000;
const URL_AUTH = `${environment.apiURL}/auth/`;

/**
 * Agrega "Authorization: Bearer <accessToken>" a las peticiones al backend.
 * Renueva el access token antes de que expire y, si el backend lo rechaza igualmente,
 * lo renueva y reintenta la petición una vez.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Login y refresh no llevan token; tampoco las peticiones a otros servidores
    if (!req.url.startsWith(environment.apiURL) || req.url.startsWith(URL_AUTH)) return next(req);

    const sesionStore = inject(SesionStore);
    const refrescoSesion = inject(RefrescoSesionService);
    const sesion = sesionStore.sesion();

    const accessToken$ = sesion == null || sesion.accessExpiraEn - MARGEN_EXPIRACION_MS > Date.now()
        ? of(sesion?.accessToken)
        : refrescoSesion.refrescar().pipe(map(nueva => nueva.accessToken));

    // Si falla la renovación, RefrescoSesionService ya decidió si cerrar la sesión: el error se propaga tal cual
    return accessToken$.pipe(
        switchMap(token => next(conToken(req, token)).pipe(
            catchError(err => {
                const codigo = codigoError(err);
                if (codigo === 'INVALID_TOKEN' && sesionStore.sesion() != null) {
                    return refrescoSesion.refrescar().pipe(
                        switchMap(nueva => next(conToken(req, nueva.accessToken)))
                    );
                }
                if (codigo === 'MISSING_TOKEN') refrescoSesion.expulsar();
                return throwError(() => err);
            })
        ))
    );
}

function conToken(req: HttpRequest<unknown>, token?: string): HttpRequest<unknown> {
    return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
}

// Código del ErrorResponseDTO del backend para los errores 401
function codigoError(err: unknown): string | undefined {
    return err instanceof HttpErrorResponse && err.status === 401 ? err.error?.error?.code : undefined;
}
