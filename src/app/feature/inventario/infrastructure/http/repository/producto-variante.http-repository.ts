import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { map, Observable } from "rxjs";
import { ProductoVariante } from "../../../application/model/producto-variante.model";
import { ProductoVarianteRepository } from "../../../application/port/producto-variante.repository";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { ProductoVarianteDTO } from "../dto/producto-variante.dto";
import { environment } from "@environment/environment";
import { ProductoVarianteDTOMapper } from "../mapper/producto-variante-dto.mapper";

export class ProductoVarianteHttpRepository implements ProductoVarianteRepository{

    private readonly apiUrl = `${environment.apiURL}/productos-variantes`
    
    constructor(
        private http: HttpClient
    ){}

    findMany(query: QueryContract): Observable<ResultContract<ProductoVariante[]>> {
        let params = new HttpParams();
        if(query.sort) params = params.appendAll({
            sort: query.sort.field,
            sortOrder: query.sort.field
        })
        if(query.search) params = params.appendAll({
            searchFields: query.search.fields.join(','),
            search: query.search.q
        })
        return this.http.get<ApiResponseDTO<ProductoVarianteDTO[]>>(this.apiUrl, { params })
        .pipe(
            map(resp => ({
                data: (resp.data ?? []).map(pvDto => ProductoVarianteDTOMapper.toModel(pvDto))
            }))
        )
    }

}