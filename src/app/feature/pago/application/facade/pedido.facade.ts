import { httpResource } from "@angular/common/http";
import { Injectable, computed, signal } from "@angular/core";
import { ApiResponse } from "@shared/api-model/api-response.model";
import { Pedido } from "../../domain/model/pedido.model";

@Injectable()
export class PedidoFacade {
    private readonly baseUrl: string = 'http://localhost:3000/api/pedidos';
    readonly id = signal<number | undefined>(undefined);

    readonly resource = httpResource<ApiResponse<Pedido>>(() => {
        const id = this.id();
        if(id == null) return undefined;
        return `${this.baseUrl}/${id}`;
    });
    readonly item = computed(() => this.resource.value()?.data);
    readonly loading = this.resource.isLoading;
    readonly error = this.resource.error;

    reload() { this.resource.reload(); }
}
