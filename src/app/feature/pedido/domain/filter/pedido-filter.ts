import { Filter } from "@shared/type/filter";

export type PedidoFilterField = "id";
export type PedidoFilter = Filter<PedidoFilterField>;
export const EMPTY_PEDIDO_FILTER: PedidoFilter = [];