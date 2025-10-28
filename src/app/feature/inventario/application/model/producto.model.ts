import { UnidadMedida } from "./unidad-medida.model";

export interface Producto {
    id: number;
    descripcion: string;
    unidadMedida: UnidadMedida;
}