import { afterNextRender, Component, computed, effect, inject, Injector } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { numeroALetras } from '@shared/util/numero-a-letras';
import componentConfig from './component.config';
import { ReciboFacade } from '../../../application/facade/recibo.facade';

/**
 * Página sin el layout de la aplicación que muestra un recibo y abre el diálogo de impresión.
 * Se abre en una pestaña nueva desde el detalle del pedido.
 */
@Component({
  selector: 'imprimir-recibo-page',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './imprimir-recibo-page.html',
  styleUrl: './imprimir-recibo-page.scss'
})
export class ImprimirReciboPage {
  private readonly aroute = inject(ActivatedRoute);
  private readonly injector = inject(Injector);
  private readonly title = inject(Title);
  private dialogoAbierto = false;

  readonly numero = toSignal(
    this.aroute.paramMap.pipe(map(params => {
      const numero = Number(params.get('numero'));
      return Number.isInteger(numero) && numero > 0 ? numero : undefined;
    }))
  );
  readonly recibo = computed(() => this.reciboFacade.item());
  readonly numeroFormateado = computed(() => String(this.recibo()?.numero ?? this.numero() ?? '').padStart(7, '0'));
  readonly montoEnLetras = computed(() => {
    const recibo = this.recibo();
    return recibo ? `guaraníes ${numeroALetras(Number(recibo.monto))}` : '';
  });
  // Un saldo negativo significa que el cliente pagó de más
  readonly saldoAFavor = computed(() => Number(this.recibo()?.saldoPosterior ?? 0) < 0);

  constructor(public readonly reciboFacade: ReciboFacade) {
    effect(() => {
      this.reciboFacade.numero.set(this.numero());
    });
    effect(() => {
      // El título se usa como nombre sugerido al guardar el recibo como PDF
      this.title.setTitle(`Recibo Nº ${this.numeroFormateado()}`);
    });
    effect(() => {
      if(this.recibo() == null || this.dialogoAbierto) return;
      this.dialogoAbierto = true;
      afterNextRender(() => this.imprimir(), { injector: this.injector });
    });
  }

  imprimir() { window.print(); }

  cerrar() { window.close(); }
}
