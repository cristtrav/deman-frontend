import { QueryContract } from "@core/application/contract/query/query.contract";
import { UnidadMedidaRepository } from "../port/unidad-medida.repository";
import { Observable } from "rxjs";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { UnidadMedida } from "../model/unidad-medida.model";

export class ConsultarUnidadesMedidasUseCase{
    
    constructor(
        private unidadMedidaRepository: UnidadMedidaRepository
    ){}

    execute(query: QueryContract): Observable<ResultContract<UnidadMedida[]>>{
        return this.unidadMedidaRepository.findMany(query);
    }
}