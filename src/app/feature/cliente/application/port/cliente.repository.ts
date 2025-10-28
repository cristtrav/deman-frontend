import { QueryContract } from "@core/application/contract/query/query.contract";
import { Observable } from "rxjs";
import { Cliente } from "../model/cliente.model";
import { NewCliente } from "../model/new-cliente.model";

export abstract class ClienteRepository {
    abstract findMany(query: QueryContract): Observable<Cliente[]>
    abstract create(newCliente: NewCliente): Observable<Cliente>
    abstract edit(previousId: number, cliente: Cliente): Observable<Cliente>
    abstract delete(id: number): Observable<void>
}