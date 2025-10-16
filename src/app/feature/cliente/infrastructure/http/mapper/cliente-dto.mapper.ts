import { Cliente } from "../../../application/model/cliente.model";
import { ClienteDTO } from "../dto/cliente.dto";

export class ClienteDTOMapper {
    static toModel(clienteDTO: ClienteDTO): Cliente {
        return {
            id: clienteDTO.id,
            razonSocial: clienteDTO.razonSocial,
            ruc: clienteDTO.ruc,
            telefono: clienteDTO.telefono
        }
    }

    static toDto(cliente: Cliente): ClienteDTO {
        return {
            id: cliente.id,
            razonSocial: cliente.razonSocial,
            ruc: cliente.ruc,
            telefono: cliente.telefono
        }
    }
}