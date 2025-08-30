import { Observable } from "rxjs";
import { MarcaRepository } from "../port/marca.repository";
import { CommandContract } from "@core/application/contract/command/command.contract";

export class EliminarMarcaUseCase {
    
    constructor(readonly marcaRepository: MarcaRepository){ }

    execute(command: CommandContract<number>): Observable<void>{
        return this.marcaRepository.delete(command.data);
    }
}