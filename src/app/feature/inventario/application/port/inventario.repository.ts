import { QueryContract } from "@core/application/contract/query/query.contract";
import { Inventario } from "../model/inventario.model";
import { Observable } from "rxjs";
import { ResultContract } from "@core/application/contract/result/result.contract";

export abstract class InventarioRepository {
    abstract findMany(query: QueryContract): Observable<ResultContract<Inventario[]>>;
}