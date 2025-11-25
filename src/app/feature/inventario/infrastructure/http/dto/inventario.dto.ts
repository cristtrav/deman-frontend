import { DetalleInventarioDTO } from "./detalle-inventario.dto";

export interface InventarioDTO {
    id: number;
    fecha: string;
    observacion?: string,
    detalles: DetalleInventarioDTO[]
}