import { CommandContract } from "@core/application/contract/command/command.contract";
import { Usuario } from "../model/usuario.model";
import { UsuarioRepository } from "../port/usuario.repository";
import { Observable } from "rxjs";

interface EditarUsuarioCommand extends CommandContract<Usuario>{
    previousId: number;
}

export class EditarUsuarioUseCase {

    constructor(readonly uaurioRepository: UsuarioRepository){}

    execute(command: EditarUsuarioCommand): Observable<Usuario>{
        return this.uaurioRepository.edit(command.previousId, command.data)
    }
}