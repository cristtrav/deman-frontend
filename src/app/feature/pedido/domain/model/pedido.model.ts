import { Cliente } from "./cliente.model";

export interface Pedido {
    id: number;
    cliente: Cliente;
    fechaPedido: string;
    fechaConfirmacion: string;
    fechaEntrega: string;
    fechaEntregado?: string;
    confirmado: boolean;
    entregado: boolean;
    descripcion: string;
    total: number;
}