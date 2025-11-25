import { EditDetalleInventarioDTO } from "./edit-detalle-inventario.dto";

export interface EditInventarioDTO {
    id: number;
    fecha: string;
    observacion?: string,
    detalles: EditDetalleInventarioDTO[]
}