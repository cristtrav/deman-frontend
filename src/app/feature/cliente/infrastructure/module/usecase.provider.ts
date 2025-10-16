import { Provider } from "@angular/core";
import { ClienteRepository } from "../../application/port/cliente.repository";
import { CrearClienteUseCase } from "../../application/usecase/crear-cliente.usecase";
import { ConsultarClienteUseCase } from "../../application/usecase/consultar-cliente.usecase";
import { EditarClienteUseCase } from "../../application/usecase/editar-cliente.usecase";
import { EliminarClienteUseCase } from "../../application/usecase/eliminar-cliente.usecase";

const usecaseProviders: Provider[] = [
    {
        provide: ConsultarClienteUseCase,
        useFactory: (ClienteRepository: ClienteRepository) => new ConsultarClienteUseCase(ClienteRepository),
        deps: [ ClienteRepository ]
    },
    {
        provide: CrearClienteUseCase,
        useFactory: (ClienteRepository: ClienteRepository) => new CrearClienteUseCase(ClienteRepository),
        deps: [ ClienteRepository ]
    },
    {
        provide: EditarClienteUseCase,
        useFactory: (ClienteRepository: ClienteRepository) => new EditarClienteUseCase(ClienteRepository),
        deps: [ ClienteRepository ]
    },
    {
        provide: EliminarClienteUseCase,
        useFactory: (ClienteRepository: ClienteRepository) => new EliminarClienteUseCase(ClienteRepository),
        deps: [ ClienteRepository ]
    },
]

export default usecaseProviders;