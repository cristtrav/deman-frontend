import { Provider } from "@angular/core";
import { ConsultarProductosUseCase } from "../../application/usecase/consultar-productos.usecase";
import { ProductoRepository } from "../../application/port/producto.repository";
import { ConsultarMarcasUseCase } from "../../application/usecase/consultar-marcas.usecase";
import { MarcaRepository } from "../../application/port/marca.repository";
import { ConsultarCategoriasUseCase } from "../../application/usecase/consultar-categorias.usecase";
import { CategoriaRepository } from "../../application/port/categoria.repository";
import { ConsultarTiposUseCase } from "../../application/usecase/consultar-tipos.usecase ";
import { TipoRepository } from "../../application/port/tipo.repository";
import { ConsultarUnidadesMedidasUseCase } from "../../application/usecase/consultar-unidades-medidas.usecase";
import { UnidadMedidaRepository } from "../../application/port/unidad-medida.repository";
import { CrearProductoUseCase } from "../../application/usecase/crear-producto.usecase";
import { EditarProductoUseCase } from "../../application/usecase/editar-producto.usecase";
import { EliminarProductoUseCase } from "../../application/usecase/eliminar-producto.usecase";

const usecaseProviders: Provider[] = [
    {
        provide: ConsultarProductosUseCase,
        useFactory: (productoRepository: ProductoRepository) => new ConsultarProductosUseCase(productoRepository),
        deps: [ ProductoRepository ]
    },
    {
        provide: ConsultarMarcasUseCase,
        useFactory: (marcaRepository: MarcaRepository) => new ConsultarMarcasUseCase(marcaRepository),
        deps: [ MarcaRepository ]
    },
    {
        provide: ConsultarCategoriasUseCase,
        useFactory: (categoriaRepository: CategoriaRepository) => new ConsultarCategoriasUseCase(categoriaRepository),
        deps: [ CategoriaRepository ]
    },
    {
        provide: ConsultarTiposUseCase,
        useFactory: (tipoRepository: TipoRepository) => new ConsultarTiposUseCase(tipoRepository),
        deps: [ TipoRepository ]
    },
    {
        provide: ConsultarUnidadesMedidasUseCase,
        useFactory: (UnidadMedidaRepository: UnidadMedidaRepository) => new ConsultarUnidadesMedidasUseCase(UnidadMedidaRepository),
        deps: [ UnidadMedidaRepository ]
    },
    {
        provide: CrearProductoUseCase,
        useFactory: (productoRepository: ProductoRepository) => new CrearProductoUseCase(productoRepository),
        deps: [ ProductoRepository ]
    },
    {
        provide: EditarProductoUseCase,
        useFactory: (productoRepository: ProductoRepository) => new EditarProductoUseCase(productoRepository),
        deps: [ ProductoRepository ]
    },
    {
        provide: EliminarProductoUseCase,
        useFactory: (productoRepository: ProductoRepository) => new EliminarProductoUseCase(productoRepository),
        deps: [ ProductoRepository ]
    }
]

export default usecaseProviders;