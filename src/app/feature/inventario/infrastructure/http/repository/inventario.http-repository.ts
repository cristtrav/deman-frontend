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
import { NewInventarioDTOMapper } from "../mapper/new-inventario-dto.mapper";
import { NewInventario } from "../../../application/model/new-inventario.model";
import { EditInventario } from "../../../application/model/edit-inventario.model";
import { EditInventarioDTOMapper } from "../mapper/edit-inventario-dto.mapper";

export class InventarioHttpRepository implements InventarioRepository {

    private readonly apiUrl = `${environment.apiURL}/inventarios`

    constructor(
        private http: HttpClient
    ){}

    delete(id: number): Observable<void> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    edit(editInventario: EditInventario): Observable<Inventario> {
        return this.http.put<ApiResponseDTO<InventarioDTO>>(
            `${this.apiUrl}/${editInventario.id}`,
            EditInventarioDTOMapper.toDTO(editInventario)
        ).pipe(
            map(resp => {
                if(resp.data == null) throw new Error('No se pudo consultar el inventario guardado')
                return InventarioDTOMapper.toModel(resp.data)
            })
        )
    }

    findById(id: number): Observable<Inventario> {
        return this.http.get<ApiResponseDTO<InventarioDTO>>(`${this.apiUrl}/${id}`)
        .pipe(
            map(resp => {
                if(resp.data == null) throw new Error(`No se encontraron datos para el inventario con código «${id}»`)
                return InventarioDTOMapper.toModel(resp.data)
            })
        );
    }

    create(inventario: NewInventario): Observable<Inventario> {
        return this.http.post<ApiResponseDTO<InventarioDTO>>(
            this.apiUrl,
            NewInventarioDTOMapper.toDTO(inventario)
        ).pipe(
            map(resp => {
                if(resp.data == null) throw new Error('No se recibió como dato el Inventario creado');
                return InventarioDTOMapper.toModel(resp.data)
            })
        );
    }

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