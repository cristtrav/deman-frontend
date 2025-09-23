import { Categoria } from "../../../application/model/categoria.model";
import { CategoriaDTO } from "../dto/categoria.dto";

export class CategoriaDTOMapper{
    static toModel(categoriaDto: CategoriaDTO): Categoria{
        return {
            id: categoriaDto.id,
            descripcion: categoriaDto.descripcion
        }
    }
}