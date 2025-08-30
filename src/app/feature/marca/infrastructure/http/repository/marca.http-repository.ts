import { map, Observable } from "rxjs";
import { Marca } from "../../../application/model/marca.model";
import { MarcaRepository } from "../../../application/port/marca.repository";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { MarcaDTO } from "../dto/marca.dto";
import { MarcaDTOMapper } from "../mapper/marca-dto.mapper";

@Injectable({ providedIn: 'root' })
export class MarcaHttpRepository implements MarcaRepository{

    private readonly apiUrl = `${environment.apiURL}/marcas`

    constructor(private http: HttpClient){}

    delete(id: number): Observable<void> {
        return this.http.delete<ApiResponseDTO<void>>(
            `${this.apiUrl}/${id}`
        ).pipe(
            map(resp => {
                if(!resp.success) throw new Error(resp.message);
                return;
            })
        )
    }

    edit(previousId: number, marca: Marca): Observable<Marca> {
        return this.http.put<ApiResponseDTO<MarcaDTO>>(
            `${this.apiUrl}/${previousId}`,
            MarcaDTOMapper.toDTO(marca)
        ).pipe(
            map(resp => {
                if(resp.data == null) throw new Error('No se recibieron datos del la marca editada')
                return MarcaDTOMapper.toModel(resp.data);
            })
        );
        
    }

    create(marca: Marca): Observable<Marca> {
        return this.http.post<ApiResponseDTO<MarcaDTO>>(
            this.apiUrl, MarcaDTOMapper.toDTO(marca)
        ).pipe(
            map(resp => {
                if(resp.data == null) throw new Error('No se recibieron datos del la marca registrada');
                return MarcaDTOMapper.toModel(resp.data);
            })
        );
    }
    
    findMany(query: QueryContract): Observable<Marca[]> {
        let params = new HttpParams().appendAll({
            sort: 'id', //BORRAR
            sortOrder: 'desc' //BORRAR
        });
        if(query.search) params = params.appendAll({
            search: query.search.q,
            searchFields: query.search.fields.join(','),
            
        })
        return this.http.get<ApiResponseDTO<MarcaDTO[]>>(this.apiUrl, { params })
        .pipe(
            map(resp => resp.data?.map(
                marcaDto => MarcaDTOMapper.toModel(marcaDto)
            ) ?? [])
        );
    }

}