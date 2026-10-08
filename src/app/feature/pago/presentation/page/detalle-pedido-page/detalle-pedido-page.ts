import { Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import componentConfig from './component.config';
import { PagoForm } from '../../component/pago-form/pago-form';
import { Pago } from '../../../domain/model/pago.model';
import { PedidoFacade } from '../../../application/facade/pedido.facade';
import { PagoFacade } from '../../../application/facade/pago.facade';
import { PagoCommandFacade } from '../../../application/facade/pago-command.facade';

@Component({
  selector: 'detalle-pedido-page',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './detalle-pedido-page.html',
  styleUrl: './detalle-pedido-page.scss'
})
export class DetallePedidoPage {
  private readonly aroute = inject(ActivatedRoute);
  readonly pagoFormView = viewChild.required<PagoForm>(PagoForm);
  readonly isModalFormVisible = signal(false);
  readonly isModalAnularVisible = signal(false);
  readonly pagoAnular = signal<Pago | undefined>(undefined);
  readonly motivoAnulacion = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/\S/)]
  });
  readonly idPedido = toSignal(
    this.aroute.paramMap.pipe(map(params => {
      const id = Number(params.get('idPedido'));
      return Number.isInteger(id) && id > 0 ? id : undefined;
    }))
  );
  readonly saldo = computed(() => this.pedidoFacade.item()?.saldo ?? 0);

  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Registrar Pago',
      icon: 'plus',
      type: 'primary',
      actionFn: () => this.newPago()
    },
    {
      label: 'Recargar',
      icon: 'reload',
      type: 'default',
      actionFn: () => this.reloadAll()
    },
    {
      label: 'Volver',
      icon: 'arrow-left',
      type: 'default',
      actionFn: () => this.router.navigate(['..'], { relativeTo: this.aroute })
    }
  ]

  constructor(
    public readonly pedidoFacade: PedidoFacade,
    public readonly pagoFacade: PagoFacade,
    public readonly modal: NzModalService,
    public readonly pagoCommandFacade: PagoCommandFacade,
    private readonly notif: NzNotificationService,
    private readonly router: Router
  ) {
    effect(() => {
      const idPedido = this.idPedido();
      this.pedidoFacade.id.set(idPedido);
      this.pagoFacade.pedidoId.set(idPedido);
    });
    effect(() => {
      if(this.pedidoFacade.error()) this.notif.error('Error', `No se pudo cargar el pedido «${this.idPedido() ?? ''}»`);
    });
    effect(() => {
      const deletedId = pagoCommandFacade.deletedId();
      if(deletedId == null) return;
      this.notif.success('Éxito', 'Pago anulado');
      this.hideModalAnular();
      this.reloadAll();
    });
    effect(() => {
      if(pagoCommandFacade.status() == 'error') this.notif.error('Error al anular', pagoCommandFacade.error() ?? '');
    });
  }

  newPago(){
    if(this.idPedido() == null) return;
    this.showModal();
  }

  reloadAll(){
    this.pedidoFacade.reload();
    this.pagoFacade.reload();
  }

  /**
   * Abre el recibo en una pestaña aparte, sin el layout de la aplicación, para imprimirlo.
   */
  imprimirRecibo(numero: number){
    const url = this.router.serializeUrl(this.router.createUrlTree(['/recibos', numero, 'imprimir']));
    window.open(url, '_blank');
  }

  ofrecerImpresion(pago: Pago | null){
    const numero = pago?.numeroRecibo;
    if(numero == null) return;
    this.hideModal();
    this.modal.confirm({
      nzTitle: `Pago registrado. Recibo Nº ${numero}`,
      nzContent: '¿Desea imprimir el recibo ahora?',
      nzOkText: 'Imprimir',
      nzCancelText: 'Más tarde',
      nzOnOk: () => this.imprimirRecibo(numero)
    });
  }

  showModal(){ this.isModalFormVisible.set(true); }
  hideModal(){ this.isModalFormVisible.set(false); }

  confirmAnular(pago: Pago){
    this.pagoAnular.set(pago);
    this.motivoAnulacion.reset('');
    this.isModalAnularVisible.set(true);
  }

  hideModalAnular(){ this.isModalAnularVisible.set(false); }

  anular(){
    const pago = this.pagoAnular();
    this.motivoAnulacion.markAsDirty();
    this.motivoAnulacion.updateValueAndValidity();
    if(pago == null || this.motivoAnulacion.invalid) return;
    this.pagoCommandFacade.anular(pago.id, this.motivoAnulacion.value.trim());
  }
}
