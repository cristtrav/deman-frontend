import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { map, Observable, of } from "rxjs";
import { UnidadMedida } from "../../../application/model/unidad-medida.model";
import { UnidadMedidaRepository } from "../../../application/port/unidad-medida.repository";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@environment/environment";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { UnidadMedidaDTO } from "../dto/unidad-medida.dto";
import { UnidadMedidaDTOMapper } from "../mapper/unidad-medida-dto.mapper";

export class UnidadMedidaHttpRepository implements UnidadMedidaRepository{

    private readonly apiUrl = `${environment.apiURL}/unidades-medidas`

    constructor(private http: HttpClient){}
    
    findMany(query: QueryContract): Observable<ResultContract<UnidadMedida[]>> {
        let params = new HttpParams();
        if(query.sort) params = params.appendAll({
            sort: query.sort.field,
            sortOrder: query.sort.order
        });
        return this.http.get<ApiResponseDTO<UnidadMedidaDTO[]>>(this.apiUrl, { params })
        .pipe(
            map(resp => ({
                data: (resp.data ?? []).map(umDto => UnidadMedidaDTOMapper.toModel(umDto)),
                page: resp.pagination ? {
                    page: resp.pagination.page,
                    pageSize: resp.pagination.pageSize,
                    total: resp.pagination.total
                } : undefined
            }))
        )
    }

    findById(id: number): Observable<UnidadMedida | undefined> {
        throw new Error("Method not implemented.");
    }

}