import { NewDetalleInventarioDTO } from "./new-detalle-inventario.dto";

export interface NewInventarioDTO {
    fecha: string;
    observacion?: string,
    detalles: NewDetalleInventarioDTO[]
}