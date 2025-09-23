import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { map, Observable } from "rxjs";
import { Marca } from "../../../application/model/marca.model";
import { MarcaRepository } from "../../../application/port/marca.repository";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@environment/environment";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { MarcaDTOMapper } from "../mapper/marca-dto.mapper";

export class MarcaHttpRepository implements MarcaRepository{

    private readonly apiUrl = `${environment.apiURL}/marcas`

    constructor(private http: HttpClient){}

    findMany(query: QueryContract): Observable<ResultContract<Marca[]>> {
        let params = new HttpParams();
        if(query.sort) params = params.appendAll({
            sort: query.sort.field,
            sortOrder: query.sort.field
        })
        return this.http.get<ApiResponseDTO<Marca[]>>(this.apiUrl, { params })
        .pipe(
            map(apiResp => ({
                data: (apiResp.data ?? []).map(dto => MarcaDTOMapper.toModel(dto)),
                page: apiResp.pagination ? {
                    page: apiResp.pagination.page,
                    pageSize: apiResp.pagination.pageSize,
                    total: apiResp.pagination.total
                } : undefined
            }))
        )
    }
    findById(id: number): Observable<Marca | undefined> {
        throw new Error("Method not implemented.");
    }

}