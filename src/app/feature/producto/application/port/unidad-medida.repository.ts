import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";
import { UnidadMedida } from "../model/unidad-medida.model";

export abstract class UnidadMedidaRepository{
    abstract findMany(query: QueryContract): Observable<ResultContract<UnidadMedida[]>>
    abstract findById(id: number): Observable<UnidadMedida | undefined>
}