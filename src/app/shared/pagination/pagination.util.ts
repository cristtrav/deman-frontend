import { HttpParams } from "@angular/common/http";
import { PageRequest } from "./page-request.model";

export class PaginationUtil {
    static buildParams(pageRequest: PageRequest): HttpParams {
        let params = new HttpParams()
        .append('page', pageRequest.page)
        .append('size', pageRequest.size);
        if(pageRequest.sort) {
            params = params.append('sort', pageRequest.sort);
            params = params.append('sortOrder', pageRequest.sortOrder || 'asc');
        } 
        return params;
    }
}