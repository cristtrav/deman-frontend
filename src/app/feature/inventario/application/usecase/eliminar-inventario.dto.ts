import { Observable } from "rxjs";
import { InventarioRepository } from "../port/inventario.repository";
import { CommandContract } from "@core/application/contract/command/command.contract";

export class EliminarInventarioUseCase {
    
    constructor(
        private inventarioRepository: InventarioRepository
    ){}

    execute(command: CommandContract<{id: number}>): Observable<any>{
        return this.inventarioRepository.delete(command.data.id);
    }
}