import { Inventario } from "../../../application/model/inventario.model";
import { InventarioDTO } from "../dto/inventario.dto";
import { DetalleInventarioDTOMapper } from "./detalle-inventario-dto.mapper";

export class InventarioDTOMapper {
    static toModel(inventarioDto: InventarioDTO): Inventario {
        return {
            id: inventarioDto.id,
            fecha: inventarioDto.fecha,
            detalles: inventarioDto.detalles.map(detalleDto => DetalleInventarioDTOMapper.toModel(detalleDto))
        }
    }
}