const UNIDADES = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const DIEZ_A_VEINTINUEVE = [
    'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve',
    'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'
];
const DECENAS = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const CENTENAS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

/**
 * Convierte un entero no negativo (hasta 999.999.999.999) a palabras en español,
 * en minúsculas. Ejemplo: 1250 → "mil doscientos cincuenta".
 */
export function numeroALetras(numero: number): string {
    if(!Number.isInteger(numero) || numero < 0 || numero > 999_999_999_999)
        throw new RangeError(`No se puede convertir a letras el número ${numero}`);
    if(numero == 0) return 'cero';

    const millones = Math.floor(numero / 1_000_000);
    const miles = Math.floor(numero / 1_000) % 1_000;
    const resto = numero % 1_000;
    const partes: string[] = [];

    if(millones == 1) partes.push('un millón');
    else if(millones > 1) partes.push(`${millaresALetras(millones)} millones`);

    if(miles == 1) partes.push('mil');
    else if(miles > 1) partes.push(`${centenasALetras(miles, true)} mil`);

    if(resto > 0) partes.push(centenasALetras(resto, false));
    return partes.join(' ');
}

// Los millones pueden llegar a 999.999 (se dice "mil millones", no "un millardo")
function millaresALetras(numero: number): string {
    const miles = Math.floor(numero / 1_000);
    const resto = numero % 1_000;
    const partes: string[] = [];
    if(miles == 1) partes.push('mil');
    else if(miles > 1) partes.push(`${centenasALetras(miles, true)} mil`);
    if(resto > 0) partes.push(centenasALetras(resto, true));
    return partes.join(' ');
}

/**
 * Convierte de 1 a 999. Con apócope, "uno" pasa a "un" y "veintiuno" a "veintiún",
 * como corresponde delante de "mil" o "millones" (veintiún mil, ciento un millones).
 */
function centenasALetras(numero: number, apocope: boolean): string {
    if(numero == 100) return 'cien';
    const centena = Math.floor(numero / 100);
    const decenaYUnidad = numero % 100;
    const partes: string[] = [];
    if(centena > 0) partes.push(CENTENAS[centena]);
    if(decenaYUnidad > 0) partes.push(decenasALetras(decenaYUnidad, apocope));
    return partes.join(' ');
}

function decenasALetras(numero: number, apocope: boolean): string {
    if(numero < 10) return apocope && numero == 1 ? 'un' : UNIDADES[numero];
    if(numero < 30) return apocope && numero == 21 ? 'veintiún' : DIEZ_A_VEINTINUEVE[numero - 10];
    const decena = Math.floor(numero / 10);
    const unidad = numero % 10;
    if(unidad == 0) return DECENAS[decena];
    return `${DECENAS[decena]} y ${apocope && unidad == 1 ? 'un' : UNIDADES[unidad]}`;
}
