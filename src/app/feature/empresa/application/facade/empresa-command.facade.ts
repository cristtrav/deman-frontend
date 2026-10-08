import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { CommandFacade } from "@shared/facade/command.facade";
import { ApiResponse } from "@shared/api-model/api-response.model";
import { Empresa } from "../../domain/model/empresa.model";

// La empresa es un único registro: el alta y la modificación son el mismo PUT
@Injectable()
export class EmpresaCommandFacade extends CommandFacade<Empresa, never, never> {
    constructor(){ super(`${environment.apiURL}/empresa`); }

    guardar(empresa: Empresa){
        this.status.set('saving');
        this.http.put<ApiResponse<Empresa>>(this.baseUrl, empresa)
        .subscribe({
            next: (resp) => {
                this.status.set('success');
                this.message.set(resp.message ?? '');
                this.error.set(null);
                this.savedItem.set(resp.data);
                this.dataChange.update(n => n + 1);
            },
            error: (err) => this.setError(err)
        });
    }
}
