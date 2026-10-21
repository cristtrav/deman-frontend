export interface UsuarioSesionDTO {
    id: number
    nombres: string
    apellidos: string
    ci: string
    isAdmin: boolean
}

export interface SesionDTO {
    accessToken: string
    refreshToken: string
    tokenType: string
    // Segundos hasta la expiración del access token
    expiresIn: number
    usuario: UsuarioSesionDTO
}
