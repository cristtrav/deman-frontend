import { NewUsuario } from "../../../application/model/new-usuario.model"
import { Usuario } from "../../../application/model/usuario.model"
import { NewUsuarioDTO } from "../dto/new-usuario.dto"

export class UsuarioDTOMapper {
    static toModel(newUsuarioDto: NewUsuarioDTO): NewUsuario {
        return {
            id: newUsuarioDto.id,
            nombres: newUsuarioDto.nombres,
            apellidos: newUsuarioDto.apellidos,
            ci: newUsuarioDto.ci,
            password: newUsuarioDto.password,
            activo: newUsuarioDto.activo
        }
    }

    static toDTO(usuario: NewUsuario): NewUsuarioDTO {
        return {
            id: usuario.id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            ci: usuario.ci,
            password: usuario.password,
            activo: usuario.activo
        }
    }
}