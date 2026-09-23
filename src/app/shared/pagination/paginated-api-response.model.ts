import { ApiResponse } from "./api-response.model";
import { Pagination } from "./pagination.model";

export interface PaginatedApiResponse<T> extends ApiResponse<T[]>{
    pagination: Pagination;
}