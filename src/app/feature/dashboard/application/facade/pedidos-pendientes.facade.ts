import { httpResource } from "@angular/common/http";
import { Injectable, computed } from "@angular/core";
import { environment } from "@environment/environment";
import { ApiResponse } from "@shared/api-model/api-response.model";

@Injectable()
export class PedidosPendientesFacade {
    readonly resource = httpResource<ApiResponse<{ cantidad: number }>>(() => `${environment.apiURL}/pedidos/pendientes/cantidad`);
    readonly cantidad = computed(() => this.resource.value()?.data.cantidad ?? 0);
    readonly loading = this.resource.isLoading;
    readonly error = this.resource.error;

    reload() { this.resource.reload(); }
}
