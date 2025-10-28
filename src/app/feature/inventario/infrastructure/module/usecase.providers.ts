import { Provider } from "@angular/core";
import { ConsultarInventariosUseCase } from "../../application/usecase/consultar-inventarios.usecase";
import { InventarioRepository } from "../../application/port/inventario.repository";

const usecaseProviders: Provider[] = [
    {
        provide: ConsultarInventariosUseCase,
        useFactory: (inventarioRepository: InventarioRepository) => new ConsultarInventariosUseCase(inventarioRepository),
        deps: [ InventarioRepository ]
    }
]
export default usecaseProviders;