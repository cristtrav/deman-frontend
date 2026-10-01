import { ResourceState } from "@shared/type/resource-state";
import { PedidoQuery } from "../query/pedido-query";
import { PaginatedApiResponse } from "@shared/api-model/paginated-api-response.model";
import { Pedido } from "../model/pedido.model";
import { Signal } from "@angular/core";

export interface PedidoRepository {
    findAll(query: Signal<PedidoQuery>): ResourceState<PaginatedApiResponse<Pedido>>
}