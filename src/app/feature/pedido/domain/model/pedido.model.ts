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
    saldo: number;
    /** Incluye pagos anulados. Con pagos registrados el total no se puede modificar. */
    tienePagos: boolean;
}