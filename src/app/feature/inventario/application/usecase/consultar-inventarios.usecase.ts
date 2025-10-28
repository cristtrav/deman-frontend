import { QueryContract } from "@core/application/contract/query/query.contract";
import { InventarioRepository } from "../port/inventario.repository";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";
import { Inventario } from "../model/inventario.model";

export class ConsultarInventariosUseCase {
    constructor(
        private inventarioRepository: InventarioRepository
    ){}

    execute(query: QueryContract): Observable<ResultContract<Inventario[]>>{
        return this.inventarioRepository.findMany(query);
    }
}