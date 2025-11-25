import { EditDetalleInventario } from "./edit-detalle-inventario.model";

export interface EditInventario {
    id: number;
    fecha: Date;
    observacion?: string,
    detalles: EditDetalleInventario[];
}