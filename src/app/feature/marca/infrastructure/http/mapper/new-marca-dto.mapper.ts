import { NewMarca } from "../../../application/model/new-marca.model";
import { NewMarcaDTO } from "../dto/new-marca.dto";

export class NewMarcaDTOMapper{
    static toModel(marcaDto: NewMarcaDTO): NewMarca{
        return {
            id: marcaDto.id,
            descripcion: marcaDto.descripcion   
        }
    }

    static toDTO(marca: NewMarca): NewMarcaDTO {
        return {
            id: marca.id,
            descripcion: marca.descripcion
        }
    }
}