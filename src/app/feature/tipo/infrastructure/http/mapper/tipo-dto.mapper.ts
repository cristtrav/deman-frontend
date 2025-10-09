import { Tipo } from "../../../application/model/tipo.model";
import { TipoDTO } from "../dto/tipo.dto";

export class TipoDTOMapper {
    static toModel(tipoDto: TipoDTO): Tipo {
        return {
            id: tipoDto.id,
            descripcion: tipoDto.descripcion
        }
    }

    static toDTO(tipo: Tipo): TipoDTO {
        return {
            id: tipo.id,
            descripcion: tipo.descripcion
        }
    }
}