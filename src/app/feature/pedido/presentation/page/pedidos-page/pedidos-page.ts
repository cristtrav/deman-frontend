import { Component, computed, effect, Inject, LOCALE_ID, signal, viewChild } from '@angular/core';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { PedidoFacade } from '../../../application/facade/pedido.facade';
import componentConfig from './component.config';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PedidoForm } from '../../component/pedido-form/pedido-form';
import { Pedido } from '../../../application/model/pedido.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { formatDate } from '@angular/common';
import { formatNumber } from '@angular/common';
import { PedidoCommandFacade } from '../../../application/facade/pedido-command.facade';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'pedidos-page',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './pedidos-page.html',
  styleUrl: './pedidos-page.scss'
})
export class PedidosPage {
  readonly pedidoFormView = viewChild.required<PedidoForm>(PedidoForm);
  readonly expandSetSignal = signal(new Set<number>());
  readonly isModalFormVisible = signal(false);
  readonly formMode = signal<'add' | 'edit'>('add');
  readonly pedidoEdit = signal<Pedido | undefined>(undefined);

  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Agregar',
      icon: 'plus',
      type: 'primary',
      actionFn: () => this.newPedido()
    },
    {
      label: 'Recargar',
      icon: 'reload',
      type: 'default',
      actionFn: () => this.pedidoFacade.reload()
    }
  ]

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public readonly pedidoFacade: PedidoFacade,
    public readonly modal: NzModalService,
    private readonly pedidoCommandFacade: PedidoCommandFacade,
    private readonly notif: NzNotificationService
  ) { 
    effect(()=> {
      const deletedId = pedidoCommandFacade.deletedId();
      if(deletedId == null) return;
      this.notif.success('Éxito', 'Pedido eliminado');
      this.pedidoFacade.reload();
    });
  }

  addExpand(id: number) {
    this.expandSetSignal.update((set) => {
      const nuevoSet = new Set(set);
      nuevoSet.add(id);
      return nuevoSet;
    });
  }

  removeExpand(id: number) {
    this.expandSetSignal.update((set) => {
      const nuevoSet = new Set(set);
      nuevoSet.delete(id);
      return nuevoSet;
    });
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) this.addExpand(id);
    else this.removeExpand(id);
  }

  isExpanded(id: number) {
    return computed(() => this.expandSetSignal().has(id));
  }

  onPaginationChange(params: NzTableQueryParams){
    this.pedidoFacade.page.set(params.pageIndex);
    this.pedidoFacade.pageSize.set(params.pageSize);
    if(params.sort.length > 0){
      const sort = params.sort[0];
      this.pedidoFacade.sort.set(sort.key);
      this.pedidoFacade.sortOrder.set(sort.value === 'ascend' ? 'asc' : 'desc');
    } else {
      this.pedidoFacade.sort.set(undefined);
      this.pedidoFacade.sortOrder.set('asc');
    }
  }

  newPedido(){
    this.formMode.set('add');
    this.showModal();
  }

  editPedido(pedido: Pedido){
    this.pedidoEdit.set(pedido);
    this.formMode.set('edit');
    this.showModal();
  }

  reload(){
    this.pedidoFacade.reload();
  }

  showModal(){ this.isModalFormVisible.set(true); }
  hideModal(){ this.isModalFormVisible.set(false); }

  confirmDelete(pedido: Pedido){
    const fechaPedido = formatDate(pedido.fechaPedido, 'dd/MM/yy', this.locale);
    const fechaEntrega = formatDate(pedido.fechaEntrega, 'dd/MM/yy', this.locale);
    const monto = formatNumber(pedido.total, this.locale)
    this.modal.confirm({
      nzTitle: '¿Desea eliminar el pedido?',
      nzContent: `Cód.:${pedido.id} | F. Pedido: ${fechaPedido} | F. Entrega: ${fechaEntrega} | Monto: Gs.${monto}`,
      nzOkDanger: true,
      nzOkText: 'Eliminar',
      nzOnOk: () => this.delete(pedido.id)
    })
  }

  private delete(id: number){
    this.pedidoCommandFacade.eliminar(id);
  }
}
