import { Provider } from "@angular/core";
import { ConsultarInventariosUseCase } from "../../application/usecase/consultar-inventarios.usecase";
import { InventarioRepository } from "../../application/port/inventario.repository";
import { ConsultarProductoVarianteUseCase } from "../../application/usecase/consultar-producto-variante.usecase";
import { ProductoVarianteRepository } from "../../application/port/producto-variante.repository";
import { CrearInventarioUseCase } from "../../application/usecase/crear-inventario.usecase";
import { ConsultarInventarioPorIdUseCase } from "../../application/usecase/consultar-inventario-por-id.usecase";
import { EditarInventarioUseCase } from "../../application/usecase/editar-inventario.usecase";
import { EliminarInventarioUseCase } from "../../application/usecase/eliminar-inventario.dto";

const usecaseProviders: Provider[] = [
    {
        provide: ConsultarInventariosUseCase,
        useFactory: (inventarioRepository: InventarioRepository) => new ConsultarInventariosUseCase(inventarioRepository),
        deps: [ InventarioRepository ]
    },
    {
        provide: ConsultarProductoVarianteUseCase,
        useFactory: (productoVarianteRepo: ProductoVarianteRepository) => new ConsultarProductoVarianteUseCase(productoVarianteRepo),
        deps: [ ProductoVarianteRepository ] 
    },
    {
        provide: CrearInventarioUseCase,
        useFactory: (inventarioRepository: InventarioRepository) => new CrearInventarioUseCase(inventarioRepository),
        deps: [ InventarioRepository ]
    },
    {
        provide: ConsultarInventarioPorIdUseCase,
        useFactory: (inventarioRepository: InventarioRepository) => new ConsultarInventarioPorIdUseCase(inventarioRepository),
        deps: [ InventarioRepository ]
    },
    {
        provide: EditarInventarioUseCase,
        useFactory: (inventarioRepository: InventarioRepository) => new EditarInventarioUseCase(inventarioRepository),
        deps: [ InventarioRepository ]
    },
    {
        provide: EliminarInventarioUseCase,
        useFactory: (inventarioRepository: InventarioRepository) => new EliminarInventarioUseCase(inventarioRepository),
        deps: [ InventarioRepository ]
    }
]
export default usecaseProviders;