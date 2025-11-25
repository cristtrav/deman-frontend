import { ProductoVariante } from "../../../application/model/producto-variante.model";
import { ProductoVarianteDTO } from "../dto/producto-variante.dto";

export class ProductoVarianteDTOMapper {
    static toModel(productoVarianteDto: ProductoVarianteDTO): ProductoVariante {
        return {
            id: {
                idproducto: productoVarianteDto.id.idproducto,
                idvariante: productoVarianteDto.id.idvariante
            },
            producto: {
                id: productoVarianteDto.producto.id,
                descripcion: productoVarianteDto.producto.descripcion,
                unidadMedida: {
                    id: productoVarianteDto.producto.unidadMedida.id,
                    descripcion: { 
                        singular: productoVarianteDto.producto.unidadMedida.descripcion.singular,
                        plural: productoVarianteDto.producto.unidadMedida.descripcion.plural
                    },
                    abreviatura: {
                        singular: productoVarianteDto.producto.unidadMedida.abreviatura.singular,
                        plural: productoVarianteDto.producto.unidadMedida.abreviatura.plural
                    }
                }
            },
            variante: {
                id: productoVarianteDto.variante.id,
                descripcion: productoVarianteDto.variante.descripcion,
                tamanio: {
                    id: productoVarianteDto.variante.tamanio.id,
                    descripcion: productoVarianteDto.variante.tamanio.descripcion
                },
                color: {
                    id: productoVarianteDto.variante.color.id,
                    descripcion: productoVarianteDto.variante.color.descripcion
                }
            }
        }
    }
}