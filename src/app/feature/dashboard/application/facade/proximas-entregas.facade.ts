import { httpResource } from "@angular/common/http";
import { Injectable, computed, signal } from "@angular/core";
import { environment } from "@environment/environment";
import { PaginatedApiResponse } from "@shared/api-model/paginated-api-response.model";
import { PeriodoEntrega, Pedido } from "../../domain/model/pedido.model";

// Cada componente que lo provee tiene su propio periodo y paginación
@Injectable()
export class ProximasEntregasFacade {
    readonly periodo = signal<PeriodoEntrega | undefined>(undefined);
    readonly page = signal(1);
    readonly pageSize = signal(5);

    readonly resource = httpResource<PaginatedApiResponse<Pedido>>(() => {
        const periodo = this.periodo();
        if (periodo == null) return undefined;
        return {
            url: `${environment.apiURL}/pedidos/proximas-entregas`,
            params: { periodo, page: this.page(), pageSize: this.pageSize() }
        };
    });
    readonly items = computed(() => this.resource.value()?.data ?? []);
    readonly total = computed(() => this.resource.value()?.pagination?.total ?? 0);
    readonly loading = this.resource.isLoading;
    readonly error = this.resource.error;

    reload() { this.resource.reload(); }
}
