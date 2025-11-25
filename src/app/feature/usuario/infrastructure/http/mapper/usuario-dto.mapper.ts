import { Usuario } from "../../../application/model/usuario.model";
import { UsuarioDTO } from "../dto/usuario.dto";

export class UsuarioDTOMapper {
    static toModel(usuarioDto: UsuarioDTO): Usuario {
        return {
            id: usuarioDto.id,
            nombres: usuarioDto.nombres,
            apellidos: usuarioDto.apellidos,
            ci: usuarioDto.ci,
            password: usuarioDto.password,
            activo: usuarioDto.activo
        }
    }

    static toDTO(usuario: Usuario): UsuarioDTO {
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