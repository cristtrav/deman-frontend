import { NewColor } from "../../../application/model/new-color.model"
import { NewColorDTO } from "../dto/new-color"

export class NewColorDTOMapper {
    static toModel(colorDto: NewColorDTO): NewColor {
        return {
            id: colorDto.id,
            descripcion: colorDto.descripcion
        }
    }

    static toDto(color: NewColor): NewColorDTO {
        return {
            id: color.id,
            descripcion: color.descripcion
        }
    }
}