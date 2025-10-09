import { CommandContract } from "@core/application/contract/command/command.contract";
import { TipoRepository } from "../port/tipo.repository";
import { Observable } from "rxjs";
import { Tipo } from "../model/tipo.model";

interface EditarTipoCommand extends CommandContract<Tipo>{
    previousId: number
}

export class EditarTipoUseCase{
    constructor(readonly tipoRepository: TipoRepository){}

    execute(command: EditarTipoCommand): Observable<Tipo>{
        return this.tipoRepository.edit(command.previousId, command.data)
    }
}