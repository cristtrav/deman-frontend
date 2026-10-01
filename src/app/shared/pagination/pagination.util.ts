import { HttpParams } from "@angular/common/http";
import { PageRequest } from "../type/page-request";

export class PaginationUtil {
    static buildParams(pageRequest: PageRequest): HttpParams {
        let params = new HttpParams()
        .append('page', pageRequest.page)
        .append('size', pageRequest.size);
        if(pageRequest.sort) {
            params = params.append('sort', pageRequest.sort.field);
            params = params.append('sortOrder', pageRequest.sort.direction || 'asc');
        } 
        return params;
    }
}