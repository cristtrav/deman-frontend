import { ProductoDTO } from "../dto/producto.dto";
import { UnidadMedidaDTOMapper } from "./unidad-medida-dto.mapper";

export class ProductoDTOMapper {
    static toModel(productoDto: ProductoDTO): ProductoDTO{
        return {
            id: productoDto.id,
            descripcion: productoDto.descripcion,
            unidadMedida: UnidadMedidaDTOMapper.toModel(productoDto.unidadMedida)
        }
    }
}