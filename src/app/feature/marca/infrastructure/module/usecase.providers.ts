import { Provider } from "@angular/core";
import { ConsultarMarcasUseCase } from "../../application/usecase/consultar-marcas.usecase";
import { MarcaRepository } from "../../application/port/marca.repository";
import { CrearMarcaUseCase } from "../../application/usecase/crear-marca.usecase";
import { EditarMarcaUseCase } from "../../application/usecase/editar-marca.usecase";
import { EliminarMarcaUseCase } from "../../application/usecase/eliminar-marca.usecase";

const usecaseProviders: Provider[] = [
    {
        provide: ConsultarMarcasUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new ConsultarMarcasUseCase(marcaRepository),
        deps: [ MarcaRepository ]
    },
    {
        provide: CrearMarcaUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new CrearMarcaUseCase(marcaRepository),
        deps: [ MarcaRepository ]
    },
    {
        provide: EditarMarcaUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new EditarMarcaUseCase(marcaRepository),
        deps: [ MarcaRepository ]
    },
    {
        provide: EliminarMarcaUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new EliminarMarcaUseCase(marcaRepository),
        deps: [ MarcaRepository ]
    },
]

export default usecaseProviders;