import { DetalleInventario } from "./detalle-inventario.model";

export interface Inventario {
    id: number;
    fecha: Date;
    observacion?: string;
    detalles: DetalleInventario[]
}