import { Pagination } from "./pagination.model";

export interface PaginatedResponse<T> {
  data: T[];
  message?: string;
  pagination: Pagination;
}