import { FilterOperatorType } from "@common/type/filter-operator.type";

export interface QueryFilterContract{
    field: string;
    value: any;
    operator: FilterOperatorType
} 