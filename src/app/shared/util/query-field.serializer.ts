import { Filter, FilterCondition, FilterOperator, FilterValue } from "@shared/type/filter";

const EMPTY_VALUES = new Set([undefined, null, '']);

/**
 * Serializa un Filter al formato de la API: { nombre: 'like:juan' }.
 * Omite condiciones con valores vacíos.
 */
export function serializeFilter<FieldType extends string>(
  filter: Filter<FieldType>,
): Record<string, string> {
  const params: Record<string, string> = {};
  for (const condition of filter) {
    if (EMPTY_VALUES.has(condition.value as any)) continue;
    params[condition.field] = `${condition.operator}:${condition.value}`;
  }
  return params;
}

/**
 * Helper para construir una condición de forma declarativa.
 */
export function condition<FieldType extends string>(
  field: FieldType,
  operator: FilterOperator,
  value: FilterValue,
): FilterCondition<FieldType> {
  return { field, operator, value };
}