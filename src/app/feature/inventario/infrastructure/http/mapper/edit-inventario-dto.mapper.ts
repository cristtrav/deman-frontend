import { EditInventario } from "../../../application/model/edit-inventario.model";
import { EditInventarioDTO } from "../dto/edit-inventario.dto";
import { EditDetalleInventarioDTOMapper } from "./edit-detalle-inventario-dto.mapper";

export class EditInventarioDTOMapper {
    static toDTO(editInventario: EditInventario): EditInventarioDTO{
        return {
            id: editInventario.id,
            fecha: this.toDateStr(editInventario.fecha),
            observacion: editInventario.observacion,
            detalles: editInventario.detalles.map(d => EditDetalleInventarioDTOMapper.toDTO(d))
        }
    }

    private static toDateStr(date: Date): string{
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}