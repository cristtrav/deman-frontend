import { UnidadMedida } from "../../../application/model/unidad-medida.model";
import { UnidadMedidaDTO } from "../dto/unidad-medida.dto";

export class UnidadMedidaDTOMapper {
    static toModel(unidadMedidaDto: UnidadMedidaDTO): UnidadMedida {
        return {
            id: unidadMedidaDto.id,
            descripcion: {
                singular: unidadMedidaDto.descripcion.singular,
                plural: unidadMedidaDto.descripcion.plural
            },
            abreviatura: {
                singular: unidadMedidaDto.abreviatura.singular,
                plural: unidadMedidaDto.abreviatura.plural
            }
        }
    }
}