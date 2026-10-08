import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { calcularDigitoVerificador, FORMATO_RUC } from "../../domain/model/ruc";

// El RUC es opcional: un valor vacío es válido
export const rucValidator: ValidatorFn = (control: AbstractControl<string | null>): ValidationErrors | null => {
    const valor = control.value?.trim();
    if(!valor) return null;
    const partes = FORMATO_RUC.exec(valor);
    if(partes == null) return { rucFormato: true };
    const [, base, digito] = partes;
    if(calcularDigitoVerificador(base) != Number(digito)) return { rucDigitoVerificador: true };
    return null;
}
