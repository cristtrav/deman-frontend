import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Producto } from "../../../application/model/producto.model";
import { ProductoRepository } from "../../../application/port/producto.repository";
import { environment } from "@environment/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { ProductoDTO } from "../dto/producto.dto";
import { map, Observable } from "rxjs";
import { ProductoDTOMapper } from "../mapper/producto-dto.mapper";

export class ProductoHttpRepository implements ProductoRepository {

    private readonly apiUrl = `${environment.apiURL}/productos`

    constructor(
        private http: HttpClient
    ){}
    
    findMany(query: QueryContract): Observable<ResultContract<Producto[]>> {
        let params = new HttpParams();
        return this.http.get<ApiResponseDTO<ProductoDTO[]>>(this.apiUrl, { params })
        .pipe(
            map(resp => ({
                data: (resp.data ?? []).map(prodDto => ProductoDTOMapper.toModel(prodDto))
            }))
        )
    }

}