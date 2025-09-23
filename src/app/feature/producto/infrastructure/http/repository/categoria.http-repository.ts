import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { map, Observable } from "rxjs";
import { Categoria } from "../../../application/model/categoria.model";
import { CategoriaRepository } from "../../../application/port/categoria.repository";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { environment } from "@environment/environment";
import { CategoriaDTO } from "../dto/categoria.dto";
import { CategoriaDTOMapper } from "../mapper/categoria-dto.mapper";

export class CategoriaHttpRepository implements CategoriaRepository {

    private readonly apiUrl = `${environment.apiURL}/categorias`

    constructor(
        private http: HttpClient
    ){}

    findMany(query: QueryContract): Observable<ResultContract<Categoria[]>> {
        let params = new HttpParams();
        if(query.sort) params = params.appendAll({
            sort: query.sort.field,
            sortOrder: query.sort.order
        })
        return this.http.get<ApiResponseDTO<CategoriaDTO[]>>(this.apiUrl, { params })
        .pipe(
            map(apiResp => ({
                data: (apiResp.data ?? []).map(dto => CategoriaDTOMapper.toModel(dto)),
                page: apiResp.pagination ? {
                    page: apiResp.pagination.page,
                    pageSize: apiResp.pagination.pageSize,
                    total: apiResp.pagination.total
                } : undefined
            }))
        )
    }

    findById(id: number): Observable<Categoria | undefined> {
        throw new Error("Method not implemented.");
    }
   
}