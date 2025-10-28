import { QueryContract } from "@core/application/contract/query/query.contract";
import { Observable } from "rxjs";
import { Tipo } from "../model/tipo.model";
import { NewTipo } from "../model/new-tipo.model";

export abstract class TipoRepository {
    abstract findMany(query: QueryContract): Observable<Tipo[]>
    abstract create(tipo: NewTipo): Observable<Tipo>
    abstract edit(previousId: number, tipo: Tipo): Observable<Tipo>
    abstract delete(id: number): Observable<void>
}