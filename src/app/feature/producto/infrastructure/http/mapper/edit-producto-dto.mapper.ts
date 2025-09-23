import { EditProducto } from "../../../application/model/edit-producto.model";
import { EditProductoDTO } from "../dto/edit-producto.dto";

export class EditProductoDTOMapper{
    static toDTO(newProducto: EditProducto): EditProductoDTO{
        return {
            id: newProducto.id,
            descripcion: newProducto.descripcion,
            precio: `${newProducto.precio}`,
            idmarca: newProducto.idmarca,
            idcategoria: newProducto.idcategoria,
            idtipo: newProducto.idtipo,
            idunidadMedida: newProducto.idunidadMedida
        }
    }
}