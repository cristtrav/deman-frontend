import { httpResource } from "@angular/common/http";
import { Injectable, computed } from "@angular/core";
import { environment } from "@environment/environment";
import { ApiResponse } from "@shared/api-model/api-response.model";

// Se usa mientras la empresa no esté registrada o no se pueda consultar
export const NOMBRE_PREDETERMINADO = 'Deman Store';

// Nombre de la empresa para el login y el título de la pestaña. El endpoint es público.
@Injectable({ providedIn: 'root' })
export class NombreEmpresaFacade {
    readonly resource = httpResource<ApiResponse<{ nombre: string | null }>>(() => `${environment.apiURL}/empresa/nombre`);
    readonly nombre = computed(() => this.resource.value()?.data?.nombre || NOMBRE_PREDETERMINADO);
    readonly loading = this.resource.isLoading;

    reload() { this.resource.reload(); }
}
