import { Component, effect, viewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { NzAlertUtil } from '@core/presentation/util/nz-alert.util';
import componentConfig from './component.config';
import { EmpresaFacade } from '../../../application/facade/empresa.facade';
import { EmpresaCommandFacade } from '../../../application/facade/empresa-command.facade';
import { Empresa } from '../../../domain/model/empresa.model';
import { rucValidator } from '../../validator/ruc.validator';

@Component({
  selector: 'empresa-page',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './empresa-page.html',
  styleUrl: './empresa-page.scss'
})
export class EmpresaPage {
  readonly alertView = viewChild.required('alert', {read: ViewContainerRef});

  form = new FormGroup({
    nombre: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]),
    direccion: new FormControl<string | null>(null, [Validators.maxLength(200)]),
    ruc: new FormControl<string | null>(null, [rucValidator]),
    telefono: new FormControl<string | null>(null, [Validators.maxLength(20)])
  });

  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Guardar',
      icon: 'save',
      type: 'primary',
      actionFn: () => this.save()
    },
    {
      label: 'Recargar',
      icon: 'reload',
      type: 'default',
      actionFn: () => this.empresaFacade.reload()
    }
  ]

  constructor(
    public readonly empresaFacade: EmpresaFacade,
    public readonly empresaCommandFacade: EmpresaCommandFacade,
    private readonly notif: NzNotificationService
  ) {
    effect(() => {
      const empresa = this.empresaFacade.item();
      this.form.reset({
        nombre: empresa?.nombre ?? null,
        direccion: empresa?.direccion ?? null,
        ruc: empresa?.ruc ?? null,
        telefono: empresa?.telefono ?? null
      });
    });
    effect(() => {
      if(this.empresaFacade.error()) this.notif.error('Error', 'No se pudieron cargar los datos de la empresa');
    });
    effect(() => {
      const status = this.empresaCommandFacade.status();
      if(status == 'initial' || status == 'saving') {
        this.alertView().clear();
      } else if(status == 'success'){
        NzAlertUtil.showSuccessAlert(this.alertView(), this.empresaCommandFacade.message());
        this.empresaFacade.reload();
      } else {
        NzAlertUtil.showErrorAlert(this.alertView(), 'Error al guardar', this.empresaCommandFacade.error() ?? '');
      }
    });
  }

  save(){
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsDirty();
      this.form.get(key)?.updateValueAndValidity();
    });
    if(!this.form.valid || this.empresaCommandFacade.isSaving()) return;

    this.empresaCommandFacade.guardar(this.getDto());
  }

  private getDto(): Empresa {
    const { nombre, direccion, ruc, telefono } = this.form.getRawValue();
    return {
      nombre: nombre?.trim() ?? '',
      direccion: direccion?.trim() || undefined,
      ruc: ruc?.trim() || undefined,
      telefono: telefono?.trim() || undefined
    }
  }
}
