import { httpResource } from "@angular/common/http";
import { Injectable, computed } from "@angular/core";
import { environment } from "@environment/environment";
import { ApiResponse } from "@shared/api-model/api-response.model";
import { Empresa } from "../../domain/model/empresa.model";

@Injectable()
export class EmpresaFacade {
    readonly resource = httpResource<ApiResponse<Empresa | null>>(() => `${environment.apiURL}/empresa`);
    // null mientras la empresa no se haya registrado
    readonly item = computed(() => this.resource.value()?.data ?? null);
    readonly registrada = computed(() => this.item() != null);
    readonly loading = this.resource.isLoading;
    readonly error = this.resource.error;

    reload() { this.resource.reload(); }
}
