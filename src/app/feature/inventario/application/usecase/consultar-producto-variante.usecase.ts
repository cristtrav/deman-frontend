import { QueryContract } from "@core/application/contract/query/query.contract";
import { ProductoVarianteRepository } from "../port/producto-variante.repository";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { ProductoVariante } from "../model/producto-variante.model";
import { Observable } from "rxjs";

export class ConsultarProductoVarianteUseCase {
    constructor(
        private productoVarianteRepo: ProductoVarianteRepository
    ){}

    execute(query: QueryContract): Observable<ResultContract<ProductoVariante[]>>{
        return this.productoVarianteRepo.findMany(query);
    }
}