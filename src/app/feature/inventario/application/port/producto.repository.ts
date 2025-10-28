import { QueryContract } from "@core/application/contract/query/query.contract";
import { Producto } from "../model/producto.model";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";

export abstract class ProductoRepository {
    abstract findMany(query: QueryContract): Observable<ResultContract<Producto[]>>;
}