/**
 * Recibo tal como se emitió: empresa, cliente y saldos son los del momento de la emisión.
 */
export interface Recibo {
    numero: number;
    pagoId: number;
    pedidoId: number;
    fechaEmision: string;
    fechaPago: string;
    monto: number;
    totalPedido: number;
    saldoAnterior: number;
    saldoPosterior: number;
    cliente: {
        razonSocial: string;
        ruc?: string;
    };
    // Ausente solo en recibos generados antes de registrar la empresa
    empresa?: {
        nombre: string;
        direccion?: string;
        ruc?: string;
        telefono?: string;
    };
    anulacion?: {
        fecha: string;
        motivo: string;
    };
    generadoPorMigracion: boolean;
}
