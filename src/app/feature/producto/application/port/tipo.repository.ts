import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";
import { Tipo } from "../model/tipo.model";

export abstract class TipoRepository{
    abstract findMany(query: QueryContract): Observable<ResultContract<Tipo[]>>
    abstract findById(id: number): Observable<Tipo | undefined>
}