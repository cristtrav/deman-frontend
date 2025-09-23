import { NewProducto } from "../../../application/model/new-producto.model";
import { NewProductoDTO } from "../dto/new-producto.dto";

export class NewProductoDTOMapper{
    static toDTO(newProducto: NewProducto): NewProductoDTO{
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