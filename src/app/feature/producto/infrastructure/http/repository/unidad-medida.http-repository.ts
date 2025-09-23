import { QueryContract } from "@core/application/contract/query/query.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { Observable, of } from "rxjs";
import { UnidadMedida } from "../../../application/model/unidad-medida.model";
import { UnidadMedidaRepository } from "../../../application/port/unidad-medida.repository";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environment/environment";

export class UnidadMedidaHttpRepository implements UnidadMedidaRepository{

    readonly mock: UnidadMedida[] = [
        {
            id: 'UN',
            descripcion: {
                singular: 'Unidad',
                plural: 'Unidades'
            },
            abreviatura: {
                singular: 'ud',
                plural: 'uds'
            }
        },
        {
        id: 'MT',
        descripcion: {
            singular: 'Metro',
            plural: 'Metros'
        },
        abreviatura: {
            singular: 'mt',
            plural: 'mts'
        }
    }
    ]

    private readonly apiUrl = `${environment.apiURL}/unidades-medidas`

    constructor(private http: HttpClient){}
    
    findMany(query: QueryContract): Observable<ResultContract<UnidadMedida[]>> {
        return of({
            data: this.mock
        })
    }

    findById(id: number): Observable<UnidadMedida | undefined> {
        throw new Error("Method not implemented.");
    }

}