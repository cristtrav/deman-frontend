export interface UsuarioSesion {
    id: number
    nombres: string
    apellidos: string
    ci: string
}

export interface Sesion {
    accessToken: string
    refreshToken: string
    tokenType: string
    // Momentos absolutos (ms epoch): calculados al recibir la sesión
    accessExpiraEn: number
    refreshExpiraEn: number
    usuario: UsuarioSesion
}
