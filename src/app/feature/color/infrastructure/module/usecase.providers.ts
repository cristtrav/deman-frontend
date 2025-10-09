import { Provider } from "@angular/core";
import { ConsultarColorUseCase } from "../../application/usecase/consultar-color.usecase";
import { ColorRepository } from "../../application/port/color.repository";
import { CrearColorUseCase } from "../../application/usecase/crear-color.usecase";
import { EditarColorUseCase } from "../../application/usecase/editar-color.usecase";
import { EliminarColorUseCase } from "../../application/usecase/eliminar-color.usecase";

const usecaseProviders: Provider[] = [
    {
        provide: ConsultarColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new ConsultarColorUseCase(colorRepository),
        deps: [ ColorRepository ]
    },
    {
        provide: CrearColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new CrearColorUseCase(colorRepository),
        deps: [ ColorRepository ]
    },
    {
        provide: EditarColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new EditarColorUseCase(colorRepository),
        deps: [ ColorRepository ]
    },
    {
        provide: EliminarColorUseCase,
        useFactory: (colorRepository: ColorRepository) => new EliminarColorUseCase(colorRepository),
        deps: [ ColorRepository ]
    },
]

export default usecaseProviders;