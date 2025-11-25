import { CommandContract } from "@core/application/contract/command/command.contract";
import { Producto } from "../model/producto.model";
import { Variante } from "../model/variante.model";
import { InventarioRepository } from "../port/inventario.repository";
import { Observable } from "rxjs";
import { Inventario } from "../model/inventario.model";

interface InventarioData {
    id: number;
    fecha: Date;
    observacion?: string;
    detalles: DetalleInventarioData[];
}

interface DetalleInventarioData {
    id?: number;
    producto: Producto;
    variante: Variante;
    cantidad: number;
}

export class EditarInventarioUseCase {
    
    constructor(
        private inventarioRepository: InventarioRepository
    ){}

    execute(command: CommandContract<InventarioData>): Observable<Inventario>{
        return this.inventarioRepository.edit({
            id: command.data.id,
            fecha: command.data.fecha,
            observacion: command.data.observacion,
            detalles: command.data.detalles.map(d => ({
                id: d.id,
                cantidad: d.cantidad,
                producto: d.producto,
                variante: d.variante
            }))
        })
    }
}