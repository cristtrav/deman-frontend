import { UnidadMedida } from "../../../application/model/unidad-medida.model";
import { UnidadMedidaDTO } from "../dto/unidad-medida.dto";

export class UnidadMedidaDTOMapper {
    static toModel(unDto: UnidadMedidaDTO): UnidadMedida {
        return {
            id: unDto.id,
            descripcion: {
                singular: unDto.descripcion.singular,
                plural: unDto.descripcion.plural
            },
            abreviatura: {
                singular: unDto.abreviatura.singular,
                plural: unDto.abreviatura.plural
            }
        }
    }
}