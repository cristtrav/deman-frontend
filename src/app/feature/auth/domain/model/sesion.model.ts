export interface UsuarioSesion {
    id: number
    nombres: string
    apellidos: string
    ci: string
    // Solo para mostrar u ocultar opciones: el backend verifica el permiso en cada operación
    isAdmin: boolean
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
