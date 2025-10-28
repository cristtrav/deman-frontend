import { ProductoVarianteId } from "./producto-variante-id.model";
import { Producto } from "./producto.model";
import { Variante } from "./variante.model";

export interface ProductoVariante {
    id: ProductoVarianteId,
    producto: Producto,
    variante: Variante
}