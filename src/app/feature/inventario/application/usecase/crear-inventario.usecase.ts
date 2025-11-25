import { Observable } from "rxjs";
import { Inventario } from "../model/inventario.model";
import { CommandContract } from "@core/application/contract/command/command.contract";
import { InventarioRepository } from "../port/inventario.repository";
import { Producto } from "../model/producto.model";
import { Variante } from "../model/variante.model";

interface DetalleInventarioData {
    producto: Producto
    variante: Variante
    cantidad: number
}

interface InventarioData {
    fecha: Date
    detalles: DetalleInventarioData[],
    observacion?: string
}

export class CrearInventarioUseCase {

    constructor(
        private inventarioRepository: InventarioRepository
    ){}

    execute(command: CommandContract<InventarioData>): Observable<Inventario> {
        return this.inventarioRepository.create({
            fecha: command.data.fecha,
            observacion: command.data.observacion,
            detalles: command.data.detalles.map(detallesData => ({
                cantidad: detallesData.cantidad,
                producto: detallesData.producto,
                variante: detallesData.variante
            }))
        })
    }
}