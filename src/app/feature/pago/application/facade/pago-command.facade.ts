import { Injectable } from "@angular/core";
import { CommandFacade } from "@shared/facade/command.facade";
import { ApiResponse } from "@shared/api-model/api-response.model";
import { Pago } from "../../domain/model/pago.model";
import { NewPago } from "../model/new-pago.model";

// Los pagos no se editan: para corregir uno se anula y se registra uno nuevo
@Injectable()
export class PagoCommandFacade extends CommandFacade<Pago, NewPago, never> {
    constructor(){ super('http://localhost:3000/api/pagos'); }

    anular(id: number, motivo: string){
        this.status.set('saving');
        this.http.post<ApiResponse<void>>(`${this.baseUrl}/${id}/anulacion`, { motivo })
        .subscribe({
            next: (resp) => {
                this.status.set('success');
                this.message.set(resp.message ?? '');
                this.error.set(null);
                this.savedItem.set(null);
                this.dataChange.update(n => n + 1);
                this.deletedId.set(id);
            },
            error: (err) => this.setError(err)
        });
    }
}
