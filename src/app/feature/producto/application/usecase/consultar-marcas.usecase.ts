import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";
import { Marca } from "../model/marca.model";
import { MarcaRepository } from "../port/marca.repository";

export class ConsultarMarcasUseCase{
    
    constructor(private marcaRepository: MarcaRepository){}

    execute(query: QueryContract): Observable<ResultContract<Marca[]>>{
        return this.marcaRepository.findMany(query);
    }
}