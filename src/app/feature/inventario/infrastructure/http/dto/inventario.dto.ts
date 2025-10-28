import { DetalleInventarioDTO } from "./detalle-inventario.dto";

export interface InventarioDTO {
    id: number;
    fecha: Date;
    detalles: DetalleInventarioDTO[]
}