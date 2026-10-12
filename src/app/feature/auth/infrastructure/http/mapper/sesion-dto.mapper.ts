import { Sesion } from "../../../domain/model/sesion.model";
import { SesionDTO } from "../dto/sesion.dto";
import { leerExpiracionJwt } from "../../jwt.util";

export class SesionDTOMapper {
    static toModel(sesionDto: SesionDTO): Sesion {
        const accessExpiraEn = Date.now() + sesionDto.expiresIn * 1000;
        return {
            accessToken: sesionDto.accessToken,
            refreshToken: sesionDto.refreshToken,
            tokenType: sesionDto.tokenType,
            accessExpiraEn,
            // El backend no informa la duración del refresh token: se toma de su claim exp
            refreshExpiraEn: leerExpiracionJwt(sesionDto.refreshToken) ?? accessExpiraEn,
            usuario: {
                id: sesionDto.usuario.id,
                nombres: sesionDto.usuario.nombres,
                apellidos: sesionDto.usuario.apellidos,
                ci: sesionDto.usuario.ci
            }
        }
    }
}
