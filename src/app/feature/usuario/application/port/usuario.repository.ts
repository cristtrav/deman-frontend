import { QueryContract } from "@core/application/contract/query/query.contract";
import { Observable } from "rxjs";
import { Usuario } from "../model/usuario.model";
import { NewUsuario } from "../model/new-usuario.model";

export abstract class UsuarioRepository {
    abstract findMany(query: QueryContract): Observable<Usuario[]>;
    abstract create(newUsuario: NewUsuario): Observable<Usuario>;
    abstract edit(previousId: number, usuario: Usuario): Observable<Usuario>;
    abstract editPassword (previousId: number, password: string): Observable<void>;
    abstract delete(id: number): Observable<void>;
}