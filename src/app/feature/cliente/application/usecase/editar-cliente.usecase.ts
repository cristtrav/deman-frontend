import { CommandContract } from "@core/application/contract/command/command.contract";
import { Cliente } from "../model/cliente.model";
import { ClienteRepository } from "../port/cliente.repository";
import { Observable } from "rxjs";

interface EditarClienteCommand extends CommandContract<Cliente> {
    previousId: number
}

export class EditarClienteUseCase {
    constructor(readonly clienteRepository: ClienteRepository) { }

    execute(command: EditarClienteCommand): Observable<Cliente> {
        return this.clienteRepository.edit(command.previousId, command.data)
    }
}