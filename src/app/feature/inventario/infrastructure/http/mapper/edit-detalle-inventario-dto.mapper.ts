import { EditDetalleInventario } from "../../../application/model/edit-detalle-inventario.model";
import { EditDetalleInventarioDTO } from "../dto/edit-detalle-inventario.dto";

export class EditDetalleInventarioDTOMapper{
    static toDTO(editDetalle: EditDetalleInventario): EditDetalleInventarioDTO{
        return {
            id: editDetalle.id,
            cantidad: editDetalle.cantidad,
            idproducto: editDetalle.producto.id,
            idvariante: editDetalle.variante.id
        }
    }
}