export interface NewPedido {
    id?: number;
    clienteId: number;
    fechaPedido: string;
    fechaEntrega: string;
    descripcion: string;
    total: number;
}