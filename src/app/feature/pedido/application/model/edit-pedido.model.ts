export interface EditPedido {
    id?: number;
    clienteId: number;
    fechaPedido: string;
    fechaEntrega: string;
    fechaEntregado?: string;
    descripcion: string;
    total: number;
}