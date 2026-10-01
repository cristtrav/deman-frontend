import { httpResource } from "@angular/common/http";
import { Injectable, computed, signal } from "@angular/core";
import { ApiResponse } from "@shared/api-model/api-response.model";
import { Pago } from "../../domain/model/pago.model";

@Injectable()
export class PagoFacade {
    private readonly baseUrl: string = 'http://localhost:3000/api/pedidos';
    readonly pedidoId = signal<number | undefined>(undefined);

    readonly resource = httpResource<ApiResponse<Pago[]>>(() => {
        const pedidoId = this.pedidoId();
        if(pedidoId == null) return undefined;
        return `${this.baseUrl}/${pedidoId}/pagos`;
    });
    readonly itemList = computed(() => this.resource.value()?.data ?? []);
    readonly totalPagado = computed(() => this.itemList().reduce((total, pago) => total + Number(pago.monto), 0));
    readonly loading = this.resource.isLoading;
    readonly error = this.resource.error;

    reload() { this.resource.reload(); }
}
