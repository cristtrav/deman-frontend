import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";
import { Categoria } from "../model/categoria.model";

export abstract class CategoriaRepository{
    abstract findMany(query: QueryContract): Observable<ResultContract<Categoria[]>>
    abstract findById(id: number): Observable<Categoria | undefined>
}