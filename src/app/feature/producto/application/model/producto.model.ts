import { Categoria } from "./categoria.model";
import { Marca } from "./marca.model";
import { Tipo } from "./tipo.model";
import { UnidadMedida } from "./unidad-medida.model";

export interface Producto {
    id: number;
    descripcion: string;
    precio: number,
    marca: Marca,
    tipo: Tipo,
    categoria: Categoria,
    unidadMedida: UnidadMedida
}