import { Injectable } from "@angular/core";
import { ColorRepository } from "../../../application/port/color.repository";
import { environment } from "@environment/environment";
import { QueryContract } from "@core/application/contract/query/query.contract";
import { map, Observable } from "rxjs";
import { Color } from "../../../application/model/color.model";
import { NewColor } from "../../../application/model/new-color.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { ColorDTO } from "../dto/color.dto";
import { ColorDTOMapper } from "../mapper/color-dto.mapper";
import { NewColorDTOMapper } from "../mapper/new-color.mapper";

@Injectable({ providedIn: 'root' })
export class ColorHttpRepository implements ColorRepository {

    private readonly apiUrl = `${environment.apiURL}/colores`

    constructor(private http: HttpClient) { }

    findMany(query: QueryContract): Observable<Color[]> {
        let params = new HttpParams()
        if(query.sort) params = params.appendAll({
            sort: query.sort.field,
            sortOrder: query.sort.order
        })
        if(query.search) params = params.appendAll({
            search: query.search.q,
            searchFields: query.search.fields.join(','),
            
        })
        return this.http.get<ApiResponseDTO<ColorDTO[]>>(this.apiUrl, {params})
        .pipe(
            map(resp => resp.data?.map(
                colorDto => ColorDTOMapper.toModel(colorDto)
            ) ?? [])
        )
    }
    create(color: NewColor): Observable<Color> {
        return this.http.post<ApiResponseDTO<ColorDTO>>(
            this.apiUrl, NewColorDTOMapper.toDto(color)
        ).pipe(
            map(resp => {
                if (resp.data == null) throw new Error('No se recibieron datos para crear el color')
                return ColorDTOMapper.toModel(resp.data)
            }
            )
        )
    }
    edit(previousId: number, color: Color): Observable<Color> {
        return this.http.put<ApiResponseDTO<ColorDTO>>(
            `${this.apiUrl}/${previousId}`,
            ColorDTOMapper.toDto(color)
        ).pipe(
            map(resp => {
                if (resp.data == null) throw new Error('No se recibieron datos del color editado')
                return ColorDTOMapper.toModel(resp.data)
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