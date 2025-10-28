import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { map, Observable } from "rxjs";
import { Inventario } from "../../../application/model/inventario.model";
import { InventarioRepository } from "../../../application/port/inventario.repository";
import { environment } from "@environment/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { InventarioDTO } from "../dto/inventario.dto";
import { InventarioDTOMapper } from "../mapper/inventario-dto.mapper";

export class InventarioHttpRepository implements InventarioRepository {

    private readonly apiUrl = `${environment.apiURL}/inventarios`

    constructor(
        private http: HttpClient
    ){}

    findMany(query: QueryContract): Observable<ResultContract<Inventario[]>> {
        let params = new HttpParams();
        if(query.pagination) params = params.appendAll({
            page: query.pagination.page,
            pageSize: query.pagination.pageSize
        })
        if(query.sort) params = params.appendAll({
            sort: query.sort.field,
            sortOrder: query.sort.order
        })        
        return this.http.get<ApiResponseDTO<InventarioDTO[]>>(this.apiUrl, { params })
         .pipe(
            map(resultDto => ({
                data: (resultDto.data ?? []).map(inventarioDto => InventarioDTOMapper.toModel(inventarioDto))
            }))
         );
    }

}