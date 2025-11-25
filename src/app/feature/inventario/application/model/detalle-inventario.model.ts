import { Producto } from "./producto.model";
import { Variante } from "./variante.model";

export interface DetalleInventario {
    id?: number;
    producto: Producto;
    variante: Variante;
    cantidad: number;
    diferencia: number;
}