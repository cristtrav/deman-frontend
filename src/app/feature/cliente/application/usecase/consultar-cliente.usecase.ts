import { QueryContract } from "@core/application/contract/query/query.contract";
import { ClienteRepository } from "../port/cliente.repository";
import { Observable } from "rxjs";
import { Cliente } from "../model/cliente.model";

export class ConsultarClienteUseCase {
    constructor(readonly clienteRepository: ClienteRepository){}

    execute(query: QueryContract): Observable<Cliente[]>{
        return this.clienteRepository.findMany(query)
    }
}