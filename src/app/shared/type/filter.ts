const FILTER_OPERATORS = ["eq", "neq","like","gte","lte"] as const;

export type FilterOperator = typeof FILTER_OPERATORS[number];

export type FilterValue = string | number | boolean

export interface FilterCondition<FieldType extends string = string>{
    field: FieldType;
    operator: FilterOperator;
    value: FilterValue
}

export type Filter<FieldType extends string = string> = FilterCondition<FieldType>[];