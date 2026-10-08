import { Component, computed, effect, Inject, input, LOCALE_ID, output, viewChild, ViewContainerRef } from '@angular/core';
import componentConfig from './component.config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { NzAlertUtil } from '@core/presentation/util/nz-alert.util';
import { Pago } from '../../../domain/model/pago.model';
import { PagoCommandFacade } from '../../../application/facade/pago-command.facade';
import { NewPago } from '../../../application/model/new-pago.model';

@Component({
  selector: 'pago-form',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './pago-form.html',
  styleUrl: './pago-form.scss'
})
export class PagoForm {
  readonly pedidoId = input.required<number>();
  readonly isSavingChange = output<boolean>();
  readonly isSaving = computed(() => this.pagoCommandFacade.isSaving());
  readonly savedPago = output<Pago | null>();
  readonly reload = output<number>();
  readonly alertView = viewChild.required('alert', {read: ViewContainerRef});

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    fecha: new FormControl<Date | null>(new Date(), [Validators.required]),
    monto: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
  });

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public readonly pagoCommandFacade: PagoCommandFacade
  ) {
    effect(() => {
      this.isSavingChange.emit(this.pagoCommandFacade.isSaving());
    });
    effect(() => {
      const status = this.pagoCommandFacade.status();
      if(status == 'initial' || status == 'saving') {
        this.alertView().clear();
      } else if(status == 'success'){
        NzAlertUtil.showSuccessAlert(this.alertView(), this.pagoCommandFacade.message());
      } else {
        console.log(this.pagoCommandFacade.error());
        NzAlertUtil.showErrorAlert(this.alertView(), 'Error al registrar', this.pagoCommandFacade.error() ?? '');
      }
    });
    effect(() => {
      const saved = this.pagoCommandFacade.savedItem();
      // Se limpia el monto para que un segundo clic no registre (y emita recibo de) un pago duplicado
      if(saved) this.form.reset({ fecha: new Date() });
      this.savedPago.emit(saved);
    });
    effect(() => {
      const dataChange = this.pagoCommandFacade.dataChange();
      this.reload.emit(dataChange);
    });
  }

  save(){
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsDirty();
      this.form.get(key)?.updateValueAndValidity();
    });
    if(!this.form.valid) return;

    this.pagoCommandFacade.crear(this.getNewDto());
  }

  private getNewDto(): NewPago{
    return {
      pedidoId: this.pedidoId(),
      fecha: this.toString(this.form.controls.fecha.value),
      monto: this.form.controls.monto.value ?? 0
    }
  }

  private toString(date: Date | null | undefined): string{
    if(!date) return '0000-00-00';
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }
}
