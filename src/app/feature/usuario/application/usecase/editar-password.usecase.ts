import { CommandContract } from "@core/application/contract/command/command.contract";
import { Usuario } from "../model/usuario.model";
import { UsuarioRepository } from "../port/usuario.repository";
import { Observable } from "rxjs";

interface EditarPasswordCommand extends CommandContract<string> {
    previousId: number;
}

export class EditarPasswordUseCase {

    constructor(readonly usuarioRepository: UsuarioRepository) { }

    execute(command: EditarPasswordCommand): Observable<void> {
      return this.usuarioRepository.editPassword(command.previousId, command.data)
    }
}