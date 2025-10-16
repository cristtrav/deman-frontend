import { NewCliente } from "../../../application/model/new-cliente.model"
import { NewClienteDTO } from "../dto/new-cliente.dto"

export class NewClienteDTOMapper {
    static toModel(newClienteDTO: NewClienteDTO): NewCliente {
        return {
            id: newClienteDTO.id,
            razonSocial: newClienteDTO.razonSocial,
            ruc: newClienteDTO.ruc,
            telefono: newClienteDTO.telefono
        }
    }

    static toDto(newCliente: NewCliente): NewClienteDTO {
        return {
            id: newCliente.id,
            razonSocial: newCliente.razonSocial,
            ruc: newCliente.ruc,
            telefono: newCliente.telefono
        }
    }
}