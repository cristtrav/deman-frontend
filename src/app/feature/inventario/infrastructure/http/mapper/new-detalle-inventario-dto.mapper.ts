import { NewDetalleInventario } from "../../../application/model/new-detalle-inventario.model";
import { NewDetalleInventarioDTO } from "../dto/new-detalle-inventario.dto";

export class NewDetalleInventarioDTOMapper {
    static toDTO(newDetalle: NewDetalleInventario): NewDetalleInventarioDTO {
        return {
            cantidad: newDetalle.cantidad,
            idproducto: newDetalle.producto.id,
            idvariante: newDetalle.variante.id
        }
    }
}