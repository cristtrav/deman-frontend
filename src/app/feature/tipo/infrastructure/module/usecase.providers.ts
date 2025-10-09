import { Provider } from "@angular/core";
import { ConsultarTiposUsecase } from "../../application/usecase/consultar-tipos.usecase";
import { TipoRepository } from "../../application/port/tipo.repository";
import { CrearTipoUseCase } from "../../application/usecase/crear-tipo.usecase";
import { EditarTipoUseCase } from "../../application/usecase/editar-tipo.usecase";
import { EliminarTipoUseCase } from "../../application/usecase/eliminar-tipo.usecase";

const usecaseProviders: Provider[] = [
    {
        provide: ConsultarTiposUsecase,
        useFactory: (tipoRepository: TipoRepository) => new ConsultarTiposUsecase(tipoRepository),
        deps: [ TipoRepository ]
    },
    {
        provide: CrearTipoUseCase,
        useFactory: (tipoRepository: TipoRepository) => new CrearTipoUseCase(tipoRepository),
        deps: [ TipoRepository ]
    },
    {
        provide: EditarTipoUseCase,
        useFactory: (tipoRepository: TipoRepository) => new EditarTipoUseCase(tipoRepository),
        deps: [ TipoRepository ]
    },
    {
        provide: EliminarTipoUseCase,
        useFactory: (tipoRepository: TipoRepository) => new EliminarTipoUseCase(tipoRepository),
        deps: [ TipoRepository ]
    },
]

export default usecaseProviders;