import { QueryContract } from "@core/application/contract/query/query.contract";
import { ColorRepository } from "../port/color.repository";
import { Observable } from "rxjs";
import { Color } from "../model/color.model";

export class ConsultarColorUseCase{
    constructor (readonly colorRepository: ColorRepository){}

    execute(query: QueryContract): Observable<Color[]>{
        return this.colorRepository.findMany(query)
    }
}