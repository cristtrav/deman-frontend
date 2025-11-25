import { Producto } from "./producto.model";
import { Variante } from "./variante.model";

export interface NewDetalleInventario {
    producto: Producto;
    variante: Variante;
    cantidad: number;
}