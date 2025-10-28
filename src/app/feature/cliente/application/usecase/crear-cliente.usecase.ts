import { CommandContract } from "@core/application/contract/command/command.contract";
import { ClienteRepository } from "../port/cliente.repository";
import { NewCliente } from "../model/new-cliente.model";
import { Observable } from "rxjs";
import { Cliente } from "../model/cliente.model";

export class CrearClienteUseCase {
    constructor(readonly clienteRepository: ClienteRepository) { }
    execute(command: CommandContract<NewCliente>): Observable<Cliente> {
        return this.clienteRepository.create({
            id: command.data.id,
            razonSocial: command.data.razonSocial,
            ruc: command.data.ruc,
            telefono: command.data.telefono
        })
    }
}