import { Signal } from "@angular/core";
import { PaginatedApiResponse } from "@shared/api-model/paginated-api-response.model";
import { ResourceState } from "@shared/type/resource-state";
import { Pedido } from "../domain/model/pedido.model";
import { PedidoQuery } from "../domain/query/pedido-query";
import { PedidoRepository } from "../domain/repository/pedido.repository";
import { httpResource } from "@angular/common/http";
import { serializeFilter } from "@shared/util/query-field.serializer";

export class PedidoApiService implements PedidoRepository{
    private readonly url: string = 'http://localhost:3000/api/pedidos';

    findAll(query: Signal<PedidoQuery>): ResourceState<PaginatedApiResponse<Pedido>> {
        const resource = httpResource<PaginatedApiResponse<Pedido>>(() => {
            const { filter, pageRequest } = query();

            return {
                url: this.url,
                params: {
                    ...serializeFilter(filter),
                    page: pageRequest.page,
                    size: pageRequest.size,
                    ...(pageRequest.sort ? {sort: pageRequest.sort.field, sortOrder: pageRequest.sort.direction} : undefined)
                }
            }
        });

        return {
            value: resource.value,
            isLoading: resource.isLoading,
            error: resource.error,
            reload: () => resource.reload()
        }
    }

}