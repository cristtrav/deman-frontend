import { Observable } from "rxjs";
import { Marca } from "../model/marca.model";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { NewMarca } from "../model/new-marca.model";

export abstract class MarcaRepository{
    abstract findMany(query: QueryContract): Observable<Marca[]>;
    abstract create(marca: NewMarca): Observable<Marca>;
    abstract edit(previousId: number, marca: Marca): Observable<Marca>;
    abstract delete(id: number): Observable<void>;
}