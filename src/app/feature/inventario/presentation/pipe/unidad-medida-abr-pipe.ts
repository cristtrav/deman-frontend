import { Pipe, PipeTransform } from '@angular/core';
import { UnidadMedida } from '../../application/model/unidad-medida.model';

@Pipe({
  name: 'unidadMedidaAbr'
})
export class UnidadMedidaAbrPipe implements PipeTransform {

  transform(unidadMedida: UnidadMedida, cantidad?: number): string {
    if(cantidad == null) return unidadMedida.abreviatura.plural;
    if(cantidad == 1) return unidadMedida.abreviatura.singular;
    return unidadMedida.abreviatura.plural;
  }

}
