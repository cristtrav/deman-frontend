import { QueryContract } from "@core/application/contract/query/query.contract";
import { Inventario } from "../model/inventario.model";
import { Observable } from "rxjs";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { NewInventario } from "../model/new-inventario.model";
import { EditInventario } from "../model/edit-inventario.model";

export abstract class InventarioRepository {
    abstract findMany(query: QueryContract): Observable<ResultContract<Inventario[]>>;
    abstract create(newInventario: NewInventario): Observable<Inventario>;
    abstract findById(id: number): Observable<Inventario>;
    abstract edit(editInventario: EditInventario): Observable<Inventario>;
    abstract delete(id: number): Observable<void>;
}