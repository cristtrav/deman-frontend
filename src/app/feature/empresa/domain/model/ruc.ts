/**
 * RUC paraguayo: número base de hasta 8 dígitos, guion y dígito verificador («1234567-9»).
 * Replica la validación de la API para avisar antes de enviar el formulario.
 */
export const FORMATO_RUC = /^(\d{1,8})-(\d)$/;

/**
 * Dígito verificador según el algoritmo módulo 11 de la SET.
 */
export function calcularDigitoVerificador(base: string): number {
    let total = 0;
    let factor = 2;
    for(let i = base.length - 1; i >= 0; i--){
        if(factor > 11) factor = 2;
        total += Number(base[i]) * factor;
        factor++;
    }
    const resto = total % 11;
    return resto > 1 ? 11 - resto : 0;
}
