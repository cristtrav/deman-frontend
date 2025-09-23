import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Producto } from "../model/producto.model";
import { Observable } from "rxjs";
import { NewProducto } from "../model/new-producto.model";
import { EditProducto } from "../model/edit-producto.model";

export abstract class ProductoRepository{
    abstract findMany(query: QueryContract): Observable<ResultContract<Producto[]>>
    abstract create(newProducto: NewProducto): Observable<Producto>;
    abstract edit(id: number, editProducto: EditProducto): Observable<Producto>;
    abstract delete(id: number): Observable<void>;
}