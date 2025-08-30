import { QueryFilterContract } from "./query-filter.contract";
import { QueryPaginationContract } from "./query-pagination.contract";
import { QuerySearchContract } from "./query-search.contract";
import { QuerySortContract } from "./query-sort.contract";

export class QueryContract{
    pagination?: QueryPaginationContract;
    sort?: QuerySortContract;
    search?: QuerySearchContract;
    filters?: QueryFilterContract[]    
}
