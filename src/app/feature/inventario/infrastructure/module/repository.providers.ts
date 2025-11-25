import { Provider } from "@angular/core";
import { InventarioRepository } from "../../application/port/inventario.repository";
import { InventarioHttpRepository } from "../http/repository/inventario.http-repository";
import { HttpClient } from "@angular/common/http";
import { ProductoRepository } from "../../application/port/producto.repository";
import { ProductoHttpRepository } from "../http/repository/producto.http-repository";
import { ProductoVarianteRepository } from "../../application/port/producto-variante.repository";
import { ProductoVarianteHttpRepository } from "../http/repository/producto-variante.http-repository";

const repositoryProviders: Provider[] = [
    {
        provide: InventarioRepository,
        useClass: InventarioHttpRepository,
        deps: [ HttpClient ]
    },
    {
        provide: ProductoRepository,
        useClass: ProductoHttpRepository,
        deps: [ HttpClient ]
    },
    {
        provide: ProductoVarianteRepository,
        useClass: ProductoVarianteHttpRepository,
        deps: [ HttpClient ]
    }
]
export default repositoryProviders;