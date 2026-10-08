export interface Pago {
    id: number;
    pedidoId: number;
    fecha: string;
    monto: number;
    numeroRecibo?: number;
}
