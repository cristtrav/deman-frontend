import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable } from "rxjs";
import { Categoria } from "../model/categoria.model";
import { CategoriaRepository } from "../port/categoria.repository";

export class ConsultarCategoriasUseCase {

    constructor(
        private categoriaRepository: CategoriaRepository
    ){}

    execute(query: QueryContract): Observable<ResultContract<Categoria[]>>{
        return this.categoriaRepository.findMany(query);
    }
}