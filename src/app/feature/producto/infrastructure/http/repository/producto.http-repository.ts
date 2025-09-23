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
import { NewProducto } from "../../../application/model/new-producto.model";
import { NewProductoDTOMapper } from "../mapper/new-producto-dto.mapper";
import { EditProducto } from "../../../application/model/edit-producto.model";
import { EditProductoDTOMapper } from "../mapper/edit-producto-dto.mapper";

export class ProductoHttpRepository implements ProductoRepository{

    private readonly apiUrl = `${environment.apiURL}/productos`

    constructor(
        private http: HttpClient
    ){ }

    
    delete(id: number): Observable<void> {
        return this.http.delete<ApiResponseDTO<void>>(`${this.apiUrl}/${id}`)
        .pipe(
            map(resp => {
                if(!resp.success) throw new Error(resp.message);
                return;
            })
        )
    }
    
    edit(id: number, editProducto: EditProducto): Observable<Producto> {
        const editProductoDto = EditProductoDTOMapper.toDTO(editProducto);
        return this.http.put<ApiResponseDTO<ProductoDTO>>(`${this.apiUrl}/${id}`, editProductoDto)
        .pipe(
            map(resp => {
                if(resp.data == null) throw Error('Error al consultar producto editado')
                return ProductoDTOMapper.toModel(resp.data)
            })
        )
    }

    create(newProducto: NewProducto): Observable<Producto> {
        const newProductoDto = NewProductoDTOMapper.toDTO(newProducto);
        return this.http.post<ApiResponseDTO<Producto>>(this.apiUrl, newProductoDto)
        .pipe(
            map(resp => {
                if(resp.data == null) throw new Error('Error al obtener resultado de registro de Producto');
                return resp.data
            })
        );
    }
    
    findMany(query: QueryContract): Observable<ResultContract<Producto[]>> {
        let params = new HttpParams();
        if(query.search) params = params.appendAll({
            search: query.search.q,
            searchFields: query.search.fields.join(',')
        })
        return this.http.get<ApiResponseDTO<ProductoDTO[]>>(this.apiUrl, { params })
        .pipe(
            map(apiResp => ({
                data: (apiResp.data ?? []).map(productosDto => ProductoDTOMapper.toModel(productosDto)),
                page: apiResp.pagination ? {
                    page: apiResp.pagination.page,
                    pageSize: apiResp.pagination.pageSize,
                    total: apiResp.pagination.total
                } : undefined
            }))
        )
    }

}