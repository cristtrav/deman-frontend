import { Observable } from "rxjs";
import { Marca } from "../model/marca.model";
import { MarcaRepository } from "../port/marca.repository";
import { QueryContract } from "@core/application/contract/query/query.contract";

export class ConsultarMarcasUseCase {

    constructor(readonly marcaRepository: MarcaRepository){}

    execute(query: QueryContract): Observable<Marca[]>{
        return this.marcaRepository.findMany(query);
    }
}