import { Provider } from "@angular/core";
import { ProductoRepository } from "../../application/port/producto.repository";
import { ProductoHttpRepository } from "../http/repository/producto.http-repository";
import { HttpClient } from "@angular/common/http";
import { MarcaRepository } from "../../application/port/marca.repository";
import { MarcaHttpRepository } from "../http/repository/marca.http-repository";
import { CategoriaRepository } from "../../application/port/categoria.repository";
import { CategoriaHttpRepository } from "../http/repository/categoria.http-repository";
import { TipoHttpRepository } from "../http/repository/tipo.http-repository";
import { TipoRepository } from "../../application/port/tipo.repository";
import { UnidadMedidaRepository } from "../../application/port/unidad-medida.repository";
import { UnidadMedidaHttpRepository } from "../http/repository/unidad-medida.http-repository";

const repositoryProviders: Provider[] = [
    {
        provide: ProductoRepository,
        useClass: ProductoHttpRepository,
        deps: [ HttpClient ]
    },
    {
        provide: MarcaRepository,
        useClass: MarcaHttpRepository,
        deps: [ HttpClient ]
    },
    {
        provide: CategoriaRepository,
        useClass: CategoriaHttpRepository,
        deps: [ HttpClient ]
    },
    {
        provide: TipoRepository,
        useClass: TipoHttpRepository,
        deps: [ HttpClient ]
    },
    {
        provide: UnidadMedidaRepository,
        useClass: UnidadMedidaHttpRepository,
        deps: [ HttpClient ]
    }
]

export default repositoryProviders;