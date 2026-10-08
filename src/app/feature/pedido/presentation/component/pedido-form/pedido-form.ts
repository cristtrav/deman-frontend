import { Component, computed, effect, ElementRef, Inject, input, LOCALE_ID, model, output, signal, viewChild, ViewContainerRef } from '@angular/core';
import componentConfig from './component.config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../../../domain/model/pedido.model';
import { ClienteFacade } from '../../../application/facade/cliente.facade';
import { Cliente } from '../../../domain/model/cliente.model';
import { Temporal } from '@js-temporal/polyfill';
import { TemporalUtil } from '@shared/temporal/temporal.util';
import { PedidoCommandFacade } from '../../../application/facade/pedido-command.facade';
import { NewPedido } from '../../../application/model/new-pedido.model';
import { formatDate } from '@angular/common';
import { NzAlertUtil } from '@core/presentation/util/nz-alert.util';
import { EditPedido } from '../../../application/model/edit-pedido.model';

@Component({
  selector: 'pedido-form',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './pedido-form.html',
  styleUrl: './pedido-form.scss'
})
export class PedidoForm {
  readonly mode = model<'add' | 'edit'>('add');
  readonly idMode = model<'auto' | 'manual'>('auto')  ;
  readonly idDisabled = computed<boolean>(() => this.idMode() == 'auto');
  readonly isSavingChange = output<boolean>();
  readonly isSaving = computed(() => this.pedidoCommandFacade.isSaving());
  readonly savedPedido = output<Pedido | null>();
  readonly clientesList = signal<Cliente[]>([]);
  readonly alertView = viewChild.required('alert', {read: ViewContainerRef});
  readonly pedidoEdit = input<Pedido>();
  readonly reload = output<number>();
  readonly totalBloqueado = computed(() => this.mode() == 'edit' && (this.pedidoEdit()?.tienePagos ?? false));

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    clienteId: new FormControl<number | null>(null, [Validators.required]),
    fechaPedido: new FormControl<Date | null>(null, [Validators.required]),
    fechaEntrega: new FormControl<Date | null>(null, [Validators.required]),
    fechaEntregado: new FormControl<Date | null>(null),
    total: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    descripcion: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public readonly clienteFacade: ClienteFacade,
    public readonly pedidoCommandFacade: PedidoCommandFacade
  ) {
    effect(() => {
      const currMode = this.mode();
      const currPedidoEdit = this.pedidoEdit();
      if(currMode == 'edit' && currPedidoEdit) this.cargarDatos(currPedidoEdit);
      if(currMode == 'edit') this.idMode.set('manual');
      if(currMode == 'add') this.form.reset();
    })
    effect(() => {
      if(this.totalBloqueado()) this.form.controls.total.disable();
      else this.form.controls.total.enable();
    })
    effect(() => {
      const idModeRead = this.idMode();
      this.form.controls.id.clearValidators();
      if(idModeRead == 'manual') this.form.controls.id.addValidators(Validators.required);      
    })
    effect(() => {
      this.isSavingChange.emit(this.pedidoCommandFacade.isSaving());
    });
    effect(() => {
      const status = this.pedidoCommandFacade.status();
      if(status == 'initial' || status == 'saving') { 
        this.alertView().clear(); 
      } else if(status == 'success'){
        NzAlertUtil.showSuccessAlert(this.alertView(), this.pedidoCommandFacade.message());
      } else {
        console.log(this.pedidoCommandFacade.error());
        NzAlertUtil.showErrorAlert(this.alertView(), this.mode() == 'add' ? 'Error al crear' : 'Error al editar', this.pedidoCommandFacade.error() ?? '');
      }  
    });
    effect(()=>{
      const saved = this.pedidoCommandFacade.savedItem();
      this.savedPedido.emit(saved)
    })
    effect(()=>{
      const dataChange = this.pedidoCommandFacade.dataChange();
      this.reload.emit(dataChange);
    })

  }

  disabledFEntrega = (current: Date): boolean => {
    const curr = TemporalUtil.toTemporalDate(current);
    const entregaDate = TemporalUtil.toTemporalDate(this.form.controls.fechaPedido.value ?? new Date());
    if(this.form.controls.fechaPedido.value == null) return false;
    return Temporal.PlainDate.compare(curr, entregaDate) < 0;
  }

  disabledFPedido = (current: Date): boolean => {
    const curr = TemporalUtil.toTemporalDate(current);
    const pedidoDate = TemporalUtil.toTemporalDate(this.form.controls.fechaEntrega.value ?? new Date());
    if(this.form.controls.fechaEntrega.value == null) return false;
    return Temporal.PlainDate.compare(curr, pedidoDate) > 0;
  }

  disabledFEntregado = (current: Date): boolean => {
    const curr = TemporalUtil.toTemporalDate(current);
    const entregaDate = TemporalUtil.toTemporalDate(this.form.controls.fechaEntrega.value ?? new Date());
    if(this.form.controls.fechaEntrega.value == null) return false;
    return Temporal.PlainDate.compare(curr, entregaDate) < 0;
  }

  switchIdMode(){
    if(this.idMode() == 'auto') this.idMode.set('manual');
    else this.idMode.set('auto');
  }

  save(){
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsDirty();
      this.form.get(key)?.updateValueAndValidity();
    })
    if(this.mode() == 'add')
      this.pedidoCommandFacade.crear(this.getNewDto())
    else{
      const id: number = this.form.controls.id.value ?? -1;
      this.pedidoCommandFacade.editar(id, this.getEditDto());
    }   
  }

  private getNewDto(): NewPedido{
    return {
      id: this.form.controls.id.value ?? undefined,
      clienteId: this.form.controls.clienteId.value ?? -1,
      fechaPedido: this.toString(this.form.controls.fechaPedido.value),
      fechaEntrega: this.toString(this.form.controls.fechaEntrega.value),
      total: this.form.controls.total.value ?? 0,
      descripcion: this.form.controls.descripcion.value ?? ''
    }
  }

  private getEditDto(): EditPedido{
    return {
      id: this.form.controls.id.value ?? undefined,
      clienteId: this.form.controls.clienteId.value ?? -1,
      fechaPedido: this.toString(this.form.controls.fechaPedido.value),
      fechaEntrega: this.toString(this.form.controls.fechaEntrega.value),
      fechaEntregado: this.form.controls.fechaEntregado.value ? this.toString(this.form.controls.fechaEntregado.value) : undefined,
      total: this.form.controls.total.value ?? 0,
      descripcion: this.form.controls.descripcion.value ?? ''
    }
  }

  private toString(date: Date | null | undefined): string{
    if(!date) return '0000-00-00';
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }

  private cargarDatos(pedido: Pedido){
    this.form.controls.id.setValue(pedido.id);
    this.form.controls.fechaPedido.setValue(new Date(`${pedido.fechaPedido}T00:00:00`))
    this.form.controls.fechaEntrega.setValue(new Date(`${pedido.fechaEntrega}T00:00:00`));
    if(pedido.fechaEntregado) 
      this.form.controls.fechaEntregado.setValue(new Date(`${pedido.fechaEntregado}T00:00:00`));
    this.form.controls.clienteId.setValue(pedido.cliente.id);
    this.form.controls.total.setValue(pedido.total);
    this.form.controls.descripcion.setValue(pedido.descripcion);
  }
}
