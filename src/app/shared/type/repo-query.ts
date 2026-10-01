import { Filter } from "./filter";
import { PageRequest } from "./page-request";

export interface RepoQuery<FieldType extends string = string>{
    filter: Filter<FieldType>,
    pageRequest: PageRequest
}