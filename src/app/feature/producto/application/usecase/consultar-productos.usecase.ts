import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";
import { ProductoRepository } from "../port/producto.repository";
import { Producto } from "../model/producto.model";

export class ConsultarProductosUseCase {

    constructor(private productoRepository: ProductoRepository){ }

    execute(query: QueryContract): Observable<ResultContract<Producto[]>>{
        return this.productoRepository.findMany(query);
    }
}