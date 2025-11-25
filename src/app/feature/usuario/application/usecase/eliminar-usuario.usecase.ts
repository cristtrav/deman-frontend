import { CommandContract } from "@core/application/contract/command/command.contract";
import { UsuarioRepository } from "../port/usuario.repository";
import { Observable } from "rxjs";

export class EliminarUsuarioUseCase {
    constructor(readonly usuarioRepository: UsuarioRepository) { }
    execute(command: CommandContract<number>): Observable<void> {
        return this.usuarioRepository.delete(command.data)
    }
}