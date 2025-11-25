import { Injectable } from "@angular/core";
import { UsuarioRepository } from "../../../application/port/usuario.repository";
import { environment } from "@environment/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ApiResponseDTO } from "@core/infrastructure/dto/api-response.dto";
import { Usuario } from "../../../application/model/usuario.model";
import { UsuarioDTO } from "../dto/usuario.dto";
import { UsuarioDTOMapper } from "../mapper/usuario-dto.mapper";
import { QueryContract } from "@core/application/contract/query/query.contract";

@Injectable({ providedIn: 'root' })
export class UsuarioHttpRepository implements UsuarioRepository {

    private readonly apiUrl = `${environment.apiURL}/usuarios`

    constructor(private http: HttpClient) { }

    editPassword(previousId: number, password: string): Observable<void> {
        return this.http.put<ApiResponseDTO<UsuarioDTO>>(
            `${this.apiUrl}/${previousId}/password`,
            { password }
        ).pipe(
            map(resp => {
                if (!resp.success) throw new Error(resp.message);
                return;
            }))
    }

    delete(id: number): Observable<void> {
        return this.http.delete<ApiResponseDTO<void>>(
            `${this.apiUrl}/${id}`
        ).pipe(
            map(resp => {
                if (!resp.success) throw new Error(resp.message);
                return;
            })
        )
    }

    edit(previousId: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<ApiResponseDTO<UsuarioDTO>>(
            `${this.apiUrl}/${previousId}`,
            UsuarioDTOMapper.toDTO(usuario)
        ).pipe(
            map(resp => {
                if (resp.data == null) throw new Error('No se recibieron datos del usuario editado')
                return UsuarioDTOMapper.toModel(resp.data);
            })
        );
    }

    create(usuario: Usuario): Observable<Usuario> {
        return this.http.post<ApiResponseDTO<UsuarioDTO>>(
            this.apiUrl, UsuarioDTOMapper.toDTO(usuario)
        ).pipe(
            map(resp => {
                if (resp.data == null) throw new Error('No se recibieron datos del usuario registrado');
                return UsuarioDTOMapper.toModel(resp.data);
            })
        );
    }

    findMany(query: QueryContract): Observable<Usuario[]> {
        let params = new HttpParams().appendAll({
            sort: 'id', //BORRAR
            sortOrder: 'desc' //BORRAR
        });
        if (query.search) params = params.appendAll({
            search: query.search.q,
            searchFields: query.search.fields.join(','),

        })
        return this.http.get<ApiResponseDTO<UsuarioDTO[]>>(this.apiUrl, { params })
            .pipe(
                map(resp => resp.data?.map(
                    usuarioDto => UsuarioDTOMapper.toModel(usuarioDto)
                ) ?? [])
            );
    }

}