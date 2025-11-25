import { Inventario } from "../../../application/model/inventario.model";
import { InventarioDTO } from "../dto/inventario.dto";
import { DetalleInventarioDTOMapper } from "./detalle-inventario-dto.mapper";

export class InventarioDTOMapper {
    static toModel(inventarioDto: InventarioDTO): Inventario {
        return {
            id: inventarioDto.id,
            fecha: new Date(`${inventarioDto.fecha}T00:00:00`),
            observacion: inventarioDto.observacion,
            detalles: inventarioDto.detalles.map(detalleDto => DetalleInventarioDTOMapper.toModel(detalleDto))
        }
    }
}