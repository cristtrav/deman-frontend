import { CommandContract } from "@core/application/contract/command/command.contract";
import { ClienteRepository } from "../port/cliente.repository";
import { Observable } from "rxjs";

export class EliminarClienteUseCase {
    constructor(readonly clienteRepository: ClienteRepository) { }
    execute(command: CommandContract<number>): Observable<void> {
        return this.clienteRepository.delete(command.data)
    }
}