import { Observable } from "rxjs";
import { UsuarioRepository } from "../port/usuario.repository";
import { Usuario } from "../model/usuario.model";
import { QueryContract } from "@core/application/contract/query/query.contract";

export class ConsultarUsuariosUseCase {
    constructor (readonly usuarioRepositosy: UsuarioRepository){}
    execute(query: QueryContract):Observable<Usuario[]>{
        return this.usuarioRepositosy.findMany(query)
    }
}