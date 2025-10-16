import { Injectable } from "@angular/core"
import { ClienteRepository } from "../../../application/port/cliente.repository"
import { environment } from "@environment/environment"
import { HttpClient, HttpParams } from "@angular/common/http"
import { QueryContract } from "@core/application/contract/query/query.contract"
import { Cliente } from "../../../application/model/cliente.model"
import { map, Observable } from "rxjs"
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto"
import { ClienteDTO } from "../dto/cliente.dto"
import { ClienteDTOMapper } from "../mapper/cliente-dto.mapper"
import { NewCliente } from "../../../application/model/new-cliente.model"
import { NewClienteDTOMapper } from "../mapper/new-cliente.dto.mapper"

@Injectable({ providedIn: 'root' })
export class ClienteHttpRepository implements ClienteRepository {

    private readonly apiUrl = `${environment.apiURL}/clientes`

    constructor(private http: HttpClient) { }

    findMany(query: QueryContract): Observable<Cliente[]> {
        let params = new HttpParams()
        if(query.sort) params = params.appendAll({
            sort: query.sort.field,
            sortOrder: query.sort.order
        })
        if(query.search) params = params.appendAll({
            search: query.search.q,
            searchFields: query.search.fields.join(','),
            
        })
        return this.http.get<ApiResponseDTO<ClienteDTO[]>>(this.apiUrl, {params})
        .pipe(
            map(resp => resp.data?.map(
                clienteDto => ClienteDTOMapper.toModel(clienteDto)
            ) ?? [])
        )
    }
    create(cliente: NewCliente): Observable<Cliente> {
        return this.http.post<ApiResponseDTO<ClienteDTO>>(
            this.apiUrl, NewClienteDTOMapper.toDto(cliente)
        ).pipe(
            map(resp => {
                if (resp.data == null) throw new Error('No se recibieron datos para crear el cliente')
                return ClienteDTOMapper.toModel(resp.data)
            }
            )
        )
    }
    edit(previousId: number, cliente: Cliente): Observable<Cliente> {
        return this.http.put<ApiResponseDTO<ClienteDTO>>(
            `${this.apiUrl}/${previousId}`,
            ClienteDTOMapper.toDto(cliente)
        ).pipe(
            map(resp => {
                if (resp.data == null) throw new Error('No se recibieron datos del cliente editado')
                return ClienteDTOMapper.toModel(resp.data)
            })
        )
    }
    delete(id: number): Observable<void> {
        return this.http.delete<ApiResponseDTO<void>>(
            `${this.apiUrl}/${id}`
        ).pipe(
            map(resp => {
                if (!resp.success) throw new Error(resp.message);
                return
            })
        )
    }

}