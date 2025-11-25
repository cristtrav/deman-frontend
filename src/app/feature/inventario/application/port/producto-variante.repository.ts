import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";
import { ProductoVariante } from "../model/producto-variante.model";

export abstract class ProductoVarianteRepository {
    abstract findMany(query: QueryContract): Observable<ResultContract<ProductoVariante[]>>;
}