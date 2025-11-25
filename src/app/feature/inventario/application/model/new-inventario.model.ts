import { NewDetalleInventario } from "./new-detalle-inventario.model";

export interface NewInventario {
    fecha: Date;
    observacion?: string,
    detalles: NewDetalleInventario[]
}