import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Marca } from "../model/marca.model";
import { Observable } from "rxjs";

export abstract class MarcaRepository{
    abstract findMany(query: QueryContract): Observable<ResultContract<Marca[]>>
    abstract findById(id: number): Observable<Marca | undefined>
}