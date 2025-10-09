import { NewTipo } from "../../../application/model/new-tipo.model";
import { NewTipoDTO } from "../dto/new-tipo.dto";

export class NewTipoDTOMapper {
    static toModel(tipoDto: NewTipoDTO): NewTipo {
        return {
            id: tipoDto.id,
            descripcion: tipoDto.descripcion
        }
    }

    static toDTO(newTipo: NewTipo): NewTipoDTO {
        return {
            id: newTipo.id,
            descripcion: newTipo.descripcion
        }
    }
}