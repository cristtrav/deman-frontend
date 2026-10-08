import { numeroALetras } from './numero-a-letras';

describe('numeroALetras', () => {
  const casos: [number, string][] = [
    [0, 'cero'],
    [1, 'uno'],
    [15, 'quince'],
    [21, 'veintiuno'],
    [30, 'treinta'],
    [31, 'treinta y uno'],
    [100, 'cien'],
    [101, 'ciento uno'],
    [500, 'quinientos'],
    [999, 'novecientos noventa y nueve'],
    [1000, 'mil'],
    [1001, 'mil uno'],
    [2500, 'dos mil quinientos'],
    [21000, 'veintiún mil'],
    [31000, 'treinta y un mil'],
    [100000, 'cien mil'],
    [101000, 'ciento un mil'],
    [150000, 'ciento cincuenta mil'],
    [1000000, 'un millón'],
    [1000001, 'un millón uno'],
    [2000000, 'dos millones'],
    [21000000, 'veintiún millones'],
    [6000000, 'seis millones'],
    [999999999, 'novecientos noventa y nueve millones novecientos noventa y nueve mil novecientos noventa y nueve'],
    [1000000000, 'mil millones'],
  ];

  casos.forEach(([numero, esperado]) => {
    it(`convierte ${numero}`, () => {
      expect(numeroALetras(numero)).toBe(esperado);
    });
  });

  it('rechaza negativos y decimales', () => {
    expect(() => numeroALetras(-1)).toThrowError(RangeError);
    expect(() => numeroALetras(1.5)).toThrowError(RangeError);
  });
});
