import { DetalleInventario } from "../../../application/model/detalle-inventario.model";
import { DetalleInventarioDTO } from "../dto/detalle-inventario.dto";

export class DetalleInventarioDTOMapper {
    static toModel(detalleDto: DetalleInventarioDTO): DetalleInventario {
        return {
            id: detalleDto.id,
            producto: {
                id: detalleDto.producto.id,
                descripcion: detalleDto.producto.descripcion,
                unidadMedida: {
                    id: detalleDto.producto.unidadMedida.id,
                    descripcion: {
                        singular: detalleDto.producto.unidadMedida.descripcion.singular,
                        plural: detalleDto.producto.unidadMedida.descripcion.plural
                    },
                    abreviatura: {
                        singular: detalleDto.producto.unidadMedida.abreviatura.singular,
                        plural: detalleDto.producto.unidadMedida.abreviatura.plural
                    }
                }
            },
            variante: {
                id: detalleDto.variante.id,
                descripcion: detalleDto.variante.descripcion,
                color: {
                    id: detalleDto.variante.color.id,
                    descripcion: detalleDto.variante.color.descripcion
                },
                tamanio: {
                    id: detalleDto.variante.tamanio.id,
                    descripcion: detalleDto.variante.tamanio.descripcion
                }
            },
            cantidad: detalleDto.cantidad,
            diferencia: detalleDto.diferencia
        }
    }
}