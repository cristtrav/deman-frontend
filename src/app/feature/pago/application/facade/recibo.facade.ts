import { httpResource } from "@angular/common/http";
import { Injectable, computed, signal } from "@angular/core";
import { environment } from "@environment/environment";
import { ApiResponse } from "@shared/api-model/api-response.model";
import { Recibo } from "../../domain/model/recibo.model";

@Injectable()
export class ReciboFacade {
    readonly numero = signal<number | undefined>(undefined);

    readonly resource = httpResource<ApiResponse<Recibo>>(() => {
        const numero = this.numero();
        if(numero == null) return undefined;
        return `${environment.apiURL}/recibos/${numero}`;
    });
    readonly item = computed(() => this.resource.value()?.data);
    readonly loading = this.resource.isLoading;
    readonly error = this.resource.error;
}
