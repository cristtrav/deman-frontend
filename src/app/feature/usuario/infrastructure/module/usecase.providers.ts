import { Provider } from "@angular/core";
import { ConsultarUsuariosUseCase } from "../../application/usecase/consultar-usuario.usecase";
import { CrearUsuarioUseCase } from "../../application/usecase/crear-usuario.usecase";
import { UsuarioRepository } from "../../application/port/usuario.repository";
import { EditarUsuarioUseCase } from "../../application/usecase/editar-usuario.usecase";
import { EliminarUsuarioUseCase } from "../../application/usecase/eliminar-usuario.usecase";
import { EditarPasswordUseCase } from "../../application/usecase/editar-password.usecase";

const usecaseProviders: Provider[] = [
    {
        provide: ConsultarUsuariosUseCase,
        useFactory: (usuarioRepository: UsuarioRepository) => new ConsultarUsuariosUseCase(usuarioRepository),
        deps: [ UsuarioRepository ]
    },
    {
        provide: CrearUsuarioUseCase,
        useFactory: (usuarioRepository: UsuarioRepository) => new CrearUsuarioUseCase(usuarioRepository),
        deps: [ UsuarioRepository ]
    },
    {
        provide: EditarUsuarioUseCase,
        useFactory: (usuarioRepository: UsuarioRepository) => new EditarUsuarioUseCase(usuarioRepository),
        deps: [ UsuarioRepository ]
    },
    {
        provide: EditarPasswordUseCase,
        useFactory: (usuarioRepository: UsuarioRepository) => new EditarPasswordUseCase(usuarioRepository),
        deps: [ UsuarioRepository ]
    },
    {
        provide: EliminarUsuarioUseCase,
        useFactory: (usuarioRepository: UsuarioRepository) => new EliminarUsuarioUseCase(usuarioRepository),
        deps: [ UsuarioRepository ]
    },
]

export default usecaseProviders;