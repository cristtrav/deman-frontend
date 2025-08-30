import { CommandContract } from "@core/application/contract/command/command.contract";
import { Marca } from "../model/marca.model";
import { Observable } from "rxjs";
import { MarcaRepository } from "../port/marca.repository";

interface EditarMarcaCommand extends CommandContract<Marca>{
    previousId: number;
}

export class EditarMarcaUseCase {

    constructor(readonly marcaRepository: MarcaRepository){}

    execute(command: EditarMarcaCommand): Observable<Marca>{
        return this.marcaRepository.edit(command.previousId, command.data)
    }
}