import { Producto } from "../../../application/model/producto.model";
import { ProductoDTO } from "../dto/producto.dto";

export class ProductoDTOMapper {
    static toModel(productoDto: ProductoDTO): Producto {
        return {
            id: productoDto.id,
            descripcion: productoDto.descripcion,
            precio: Number(productoDto.precio),
            marca: { id: productoDto.marca.id, descripcion: productoDto.marca.descripcion },
            tipo: { id: productoDto.tipo.id, descripcion: productoDto.tipo.descripcion },
            categoria: { id: productoDto.categoria.id, descripcion: productoDto.categoria.descripcion },
            unidadMedida: {
                id: productoDto.unidadMedida.id,
                descripcion: {
                    singular: productoDto.unidadMedida.descripcion.singular,
                    plural: productoDto.unidadMedida.descripcion.plural
                },
                abreviatura: {
                    singular: productoDto.unidadMedida.abreviatura.singular,
                    plural: productoDto.unidadMedida.abreviatura.plural
                }
            }
        }
    }
}