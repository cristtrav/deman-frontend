import { NewInventarioDTO } from "../dto/new-inventario.dto";
import { NewDetalleInventarioDTOMapper } from "./new-detalle-inventario-dto.mapper";
import { NewInventario } from "../../../application/model/new-inventario.model";

export class NewInventarioDTOMapper {
    static toDTO(inventario: NewInventario): NewInventarioDTO{
        return {
            fecha: this.toDateStr(inventario.fecha),
            observacion: inventario.observacion,
            detalles: inventario.detalles.map(d => NewDetalleInventarioDTOMapper.toDTO(d))
        }
    }

    private static toDateStr(date: Date){
        const year = `${date.getFullYear()}`;
        const month = `${(date.getMonth() + 1)}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}