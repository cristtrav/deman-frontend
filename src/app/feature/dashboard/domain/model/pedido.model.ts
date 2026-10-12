export interface Pedido {
    id: number;
    cliente: {
        id: number;
        razonSocial: string;
    };
    fechaPedido: string;
    fechaEntrega: string;
    descripcion: string;
    total: number;
    saldo: number;
}

// hoy: entregas de la fecha actual. semana: los 6 días siguientes (no repite las de hoy).
// atrasados: entregas con fecha anterior a hoy que siguen pendientes.
export type PeriodoEntrega = 'hoy' | 'semana' | 'atrasados';
