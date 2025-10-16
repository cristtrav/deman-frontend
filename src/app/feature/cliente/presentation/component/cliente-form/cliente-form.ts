import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzAlertComponent, NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { Cliente } from '../../../application/model/cliente.model';
import { CrearClienteUseCase } from '../../../application/usecase/crear-cliente.usecase';
import { EditarClienteUseCase } from '../../../application/usecase/editar-cliente.usecase';
import { finalize } from 'rxjs';

@Component({
  selector: 'cliente-form',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzAlertModule,
    NzButtonComponent,
    NzIconModule
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.scss'
})
export class ClienteForm {
  private _mode: 'add' | 'edit' = 'add';
  private _isSaving: boolean = false;

  private _idMode: 'auto' | 'manual' = 'auto'

  @ViewChild('notification', { read: ViewContainerRef })
  notifContainer!: ViewContainerRef;

  @Input()
  set mode(m: 'add' | 'edit') {
    this._mode = m;
    if (m == 'edit') this.idMode = 'manual'
    this.modeChange.emit(m)
  }

  get mode(): 'add' | 'edit' { return this._mode }

  @Input()
  editingCliente?: Cliente;

  @Output()
  savedCliente = new EventEmitter<Cliente>();
  @Output()
  isSavingChange = new EventEmitter<boolean>();
  @Output()
  modeChange = new EventEmitter<'add' | 'edit'>()

  get isSaving(): boolean { return this._isSaving }
  set isSaving(value: boolean) {
    this._isSaving = value;
    this.isSavingChange.emit(value);
  }

  get idMode(): 'auto' | 'manual' { return this._idMode }
  set idMode(m: 'auto' | 'manual') {
    this._idMode = m;
    if (m == 'auto') {
      this.form.controls.id.reset();
      this.form.controls.id.clearValidators();
    } else {
      this.form.controls.id.addValidators(Validators.required)
    }
  }

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    razonSocial: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(100)]),
    ruc: new FormControl<string |null>(null, [Validators.required, Validators.maxLength(10)]),
    telefono: new FormControl<string |null>(null, [Validators.required, Validators.maxLength(20)])
  })

  constructor(
    readonly crearClienteUseCase: CrearClienteUseCase,
    readonly editarClienteUseCase: EditarClienteUseCase
  ) { }

  ngOnInit(): void {
    if (this.mode == 'edit' && this.editingCliente)
      this.loadFormData(this.editingCliente);
  }

  save() {
    Object.keys(this.form.controls)
      .forEach(ctrl => {
        this.form.get(ctrl)?.markAsDirty();
        this.form.get(ctrl)?.updateValueAndValidity();
      })
    if (!this.form.valid) return;
    if (this.mode == 'add') this.create();
    else this.edit();
  }

  private create() {
    this.isSaving = true;
    this.crearClienteUseCase.execute({
      data: {
        id: this.form.controls.id.value ?? undefined,
        razonSocial: this.form.controls.razonSocial.value ?? '',
        ruc: this.form.controls.ruc.value ?? '',
        telefono: this.form.controls.telefono.value ?? ''
      }
    })
      .pipe(
        finalize(() => this.isSaving = false)
      )
      .subscribe({
        next: savedCliente => {
          this.showSuccessAlert('Cliente creado');
          this.savedCliente.emit();
          this.editingCliente = savedCliente;
          this.loadFormData(savedCliente);
          this.mode = 'edit';
        },
        error: e => {
          console.error('Error al crear cliente', e);
          this.showErrorAlert('Error al crear cliente', e.message);
        }
      });
  }

  private edit() {
    this.isSaving = true;
    this.editarClienteUseCase.execute({
      previousId: this.editingCliente?.id ?? -1,
      data: {
        id: this.form.controls.id.value ?? -1,
        razonSocial: this.form.controls.razonSocial.value ?? '', 
        ruc: this.form.controls.ruc.value ?? '', 
        telefono: this.form.controls.telefono.value ?? '', 
      }
    }).pipe(
      finalize(() => this.isSaving = false)
    )
      .subscribe({
        next: (savedCliente) => {
          this.showSuccessAlert('Cliente editado');
          this.loadFormData(savedCliente);
          this.savedCliente.emit(savedCliente)
          this.editingCliente = savedCliente
        },
        error: (e) => {
          console.error(e);
          this.showErrorAlert('Error al editar cliente', e.message);
        }
      })
  }

  private loadFormData(cliente: Cliente) {
    this.form.controls.id.setValue(cliente.id);
    this.form.controls.razonSocial.setValue(cliente.razonSocial);
    this.form.controls.ruc.setValue(cliente.ruc);
    this.form.controls.telefono.setValue(cliente.telefono);
  }

  private showSuccessAlert(message: string, description?: string) {
    this.showAlert('success', message, description);
  }

  private showErrorAlert(message: string, description?: string) {
    this.showAlert('error', message, description);
  }

  private showAlert(type: 'success' | 'error', message: string, description?: string) {
    this.notifContainer.clear();
    const alert = this.notifContainer.createComponent(NzAlertComponent);
    alert.instance.nzType = type;
    alert.instance.nzShowIcon = true;
    alert.instance.nzMessage = message;
    alert.instance.nzDescription = description ?? '';
    alert.instance.nzCloseable = true;
  }

  resetForm() {
    this.notifContainer.clear();
    this.idMode = 'auto';
    this.mode = 'add';
    this.form.reset();
  }

  switchIdMode() {
    this.idMode = this.idMode == 'auto' ? 'manual' : 'auto';
  }
}
