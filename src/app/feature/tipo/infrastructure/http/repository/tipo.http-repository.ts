import { QueryContract } from "@core/application/contract/query/query.contract";
import { map, Observable } from "rxjs";
import { NewTipo } from "../../../application/model/new-tipo.model";
import { Tipo } from "../../../application/model/tipo.model";
import { TipoRepository } from "../../../application/port/tipo.repository";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@environment/environment";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { TipoDTO } from "../dto/tipo.dto";
import { TipoDTOMapper } from "../mapper/tipo-dto.mapper";
import { NewTipoDTOMapper } from "../mapper/new-tipo-dto.mapper";

export class TipoHttpRepository implements TipoRepository {

    private readonly apiUrl = `${environment.apiURL}/tipos`

    constructor(private http: HttpClient) { }

    findMany(query: QueryContract): Observable<Tipo[]> {
        let params = new HttpParams()
        if (query.sort) params = params.appendAll({
            sort: query.sort.field,
            sortOrder: query.sort.order
        })
        if (query.search) params = params.appendAll({
            search: query.search.q,
            searchFields: query.search.fields.join(','),
        })
        return this.http.get<ApiResponseDTO<TipoDTO[]>>(this.apiUrl, { params })
            .pipe(
                map(resp => resp.data?.map(
                    tipoDto => TipoDTOMapper.toModel(tipoDto)
                ) ?? [])
            )
    }
    create(tipo: NewTipo): Observable<Tipo> {
        return this.http.post<ApiResponseDTO<TipoDTO>>(
            this.apiUrl, NewTipoDTOMapper.toDTO(tipo)
        ).pipe(
            map(resp => {
                if (resp.data == null) throw new Error('No se recibieron datos del tipo')
                return TipoDTOMapper.toModel(resp.data)
            })
        )
    }
    edit(previousId: number, tipo: Tipo): Observable<Tipo> {
        return this.http.put<ApiResponseDTO<TipoDTO>>(
            `${this.apiUrl}/${previousId}`,
            TipoDTOMapper.toDTO(tipo)
        ).pipe(
            map(resp => {
                if (resp.data == null) throw new Error('No se recibieron datos del tipo')
                return TipoDTOMapper.toModel(resp.data)
            })
        )
    }
    delete(id: number): Observable<void> {
        return this.http.delete<ApiResponseDTO<void>>(
            `${this.apiUrl}/${id}`
        ).pipe(
            map(resp => {
                if (!resp.success) throw new Error(resp.message)
                return
            })
        )
    }

}