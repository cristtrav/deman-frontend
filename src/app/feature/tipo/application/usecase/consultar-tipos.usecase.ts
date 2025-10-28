import { Observable } from "rxjs";
import { TipoRepository } from "../port/tipo.repository";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { Tipo } from "../model/tipo.model";

export class ConsultarTiposUsecase {
    constructor(readonly tipoRepository: TipoRepository){}

    execute(query: QueryContract):Observable<Tipo[]>{
        return this.tipoRepository.findMany(query)
    }
}