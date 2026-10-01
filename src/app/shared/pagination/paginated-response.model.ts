import { Pagination } from "../api-model/pagination.model";

export interface PaginatedResponse<T> {
  data: T[];
  message?: string;
  pagination: Pagination;
}