import { Usuario } from "../../../application/model/usuario.model";
import { UsuarioDTO } from "../dto/usuario.dto";

export class UsuarioDTOMapper {
    static toModel(usuarioDto: UsuarioDTO): Usuario {
        return {
            id: usuarioDto.id,
            nombres: usuarioDto.nombres,
            apellidos: usuarioDto.apellidos,
            ci: usuarioDto.ci,
            activo: usuarioDto.activo,
            isAdmin: usuarioDto.isAdmin
        }
    }

    static toDTO(usuario: Usuario): UsuarioDTO {
        return {
            id: usuario.id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            ci: usuario.ci,
            activo: usuario.activo,
            isAdmin: usuario.isAdmin
        }
    }
}