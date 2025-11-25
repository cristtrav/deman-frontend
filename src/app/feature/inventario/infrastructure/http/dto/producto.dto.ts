import { UnidadMedidaDTO } from "./unidad-medida.dto"

export interface ProductoDTO {
    id: number
    descripcion: string
    unidadMedida: UnidadMedidaDTO
}