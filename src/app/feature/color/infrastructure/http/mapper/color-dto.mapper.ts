import { Color } from "../../../application/model/color.model";
import { NewColor } from "../../../application/model/new-color.model";
import { ColorDTO } from "../dto/color.dto";

export class ColorDTOMapper {
    static toModel(colorDto: ColorDTO): Color {
        return {
            id: colorDto.id,
            descripcion: colorDto.descripcion
        }
    }

    static toDto(color: Color): ColorDTO {
        return {
            id: color.id,
            descripcion: color.descripcion
        }

    }

}