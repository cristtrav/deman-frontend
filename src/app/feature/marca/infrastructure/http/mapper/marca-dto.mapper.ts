import { Marca } from "../../../application/model/marca.model";
import { MarcaDTO } from "../dto/marca.dto";

export class MarcaDTOMapper{
    static toModel(marcaDto: MarcaDTO): Marca{
        return {
            id: marcaDto.id,
            descripcion: marcaDto.descripcion   
        }
    }

    static toDTO(marca: Marca): MarcaDTO {
        return {
            id: marca.id,
            descripcion: marca.descripcion
        }
    }
}