import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { map, Observable } from "rxjs";
import { Categoria } from "../../../application/model/categoria.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { environment } from "@environment/environment";
import { TipoRepository } from "../../../application/port/tipo.repository";
import { TipoDTOMapper } from "../mapper/tipo-dto.mapper";
import { Tipo } from "../../../application/model/tipo.model";
import { TipoDTO } from "../dto/tipo.dto";

export class TipoHttpRepository implements TipoRepository {

    private readonly apiUrl = `${environment.apiURL}/tipos`

    constructor(
        private http: HttpClient
    ){}

    findMany(query: QueryContract): Observable<ResultContract<Tipo[]>> {
        let params = new HttpParams();
        if(query.sort) params = params.appendAll({
            sort: query.sort.field,
            sortOrder: query.sort.order
        })
        return this.http.get<ApiResponseDTO<TipoDTO[]>>(this.apiUrl, { params })
        .pipe(
            map(apiResp => ({
                data: (apiResp.data ?? []).map(dto => TipoDTOMapper.toModel(dto)),
                page: apiResp.pagination ? {
                    page: apiResp.pagination.page,
                    pageSize: apiResp.pagination.pageSize,
                    total: apiResp.pagination.total
                } : undefined
            }))
        )
    }

    findById(id: number): Observable<Tipo | undefined> {
        throw new Error("Method not implemented.");
    }
   
}