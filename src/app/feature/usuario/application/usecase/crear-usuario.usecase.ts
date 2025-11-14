import { CommandContract } from "@core/application/contract/command/command.contract";
import { UsuarioRepository } from "../port/usuario.repository";
import { NewUsuario } from "../model/new-usuario.model";
import { Observable } from "rxjs";
import { Usuario } from "../model/usuario.model";

export class CrearUsuarioUseCase {
    constructor(readonly usuarioRepository: UsuarioRepository) { }

    execute(command: CommandContract<NewUsuario>): Observable<Usuario> {
        return this.usuarioRepository.create({
            id: command.data.id,
            nombres: command.data.nombres,
            apellidos: command.data.apellidos,
            ci: command.data.ci,
            password: command.data.password,
            activo: command.data.activo
        })
    }
}