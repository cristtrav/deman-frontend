import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";
import { TipoRepository } from "../port/tipo.repository";
import { Tipo } from "../model/tipo.model";

export class ConsultarTiposUseCase {

    constructor(
        private tipoRepository: TipoRepository
    ){}

    execute(query: QueryContract): Observable<ResultContract<Tipo[]>>{
        return this.tipoRepository.findMany(query);
    }
}