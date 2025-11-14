import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Usuario } from '../../../application/model/usuario.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearUsuarioUseCase } from '../../../application/usecase/crear-usuario.usecase';
import { EditarUsuarioUseCase } from '../../../application/usecase/editar-usuario.usecase';
import { finalize } from 'rxjs';
import { NzAlertComponent, NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'usuario-form',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzAlertModule,
    NzButtonComponent,
    NzIconModule,
  ],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss'
})
export class UsuarioForm implements OnInit {

  private _mode: 'add' | 'edit' | 'editPassword' = 'add';
  private _isSaving: boolean = false;
  passwordVisible = false;
  password?: string;

  private _idMode: 'auto' | 'manual' = 'auto';

  @ViewChild('notification', { read: ViewContainerRef })
  notifContainer!: ViewContainerRef;

  @Input()
  set mode(m: 'add' | 'edit' | 'editPassword') {
    this._mode = m;
    if (m == 'edit') this.idMode = 'manual';
    this.modeChange.emit(m);
  }
  get mode(): 'add' | 'edit' | 'editPassword' { return this._mode }

  @Input()
  editingUsuario?: Usuario;

  @Output()
  savedUsuario = new EventEmitter<Usuario>();
  @Output()
  isSavingChange = new EventEmitter<boolean>();
  @Output()
  modeChange = new EventEmitter<'add' | 'edit' | 'editPassword'>();

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
    nombres: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)]),
    apellidos: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)]),
    ci: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)]),
    activo: new FormControl<boolean | true>(true, [Validators.required])
  })

  constructor(
    readonly crearUsuariosUseCase: CrearUsuarioUseCase,
    readonly editarUsuariosUseCase: EditarUsuarioUseCase,
  ) { }

  ngOnInit(): void {
    if (this.mode == 'edit' && this.editingUsuario) {
      this.loadFormData(this.editingUsuario);
      this.form.controls.password.clearValidators();
      this.form.controls.password.updateValueAndValidity();
    }
  }

  save() {
    Object.keys(this.form.controls)
      .forEach(ctrl => {
        this.form.get(ctrl)?.markAsDirty();
        this.form.get(ctrl)?.updateValueAndValidity();
      })
    if (!this.form.valid) return;
    if (this.mode === 'add')
      this.create();
    else if (this.mode === 'edit') {
      this.edit();
    }
  }

  private create() {
    this.isSaving = true;
    this.crearUsuariosUseCase.execute({
      data: {
        id: this.form.controls.id.value ?? undefined,
        nombres: this.form.controls.nombres.value ?? '',
        apellidos: this.form.controls.apellidos.value ?? '',
        ci: this.form.controls.ci.value ?? '',
        password: this.form.controls.password.value ?? '',
        activo: this.form.controls.activo.value ?? true
      }
    })
      .pipe(
        finalize(() => this.isSaving = false)
      )
      .subscribe({
        next: savedUsuario => {
          this.showSuccessAlert('Usuario creado');
          this.savedUsuario.emit();
          this.editingUsuario = savedUsuario;
          this.loadFormData(savedUsuario);
          this.mode = 'edit';
        },
        error: e => {
          console.error('Error al crear usuario', e);
          this.showErrorAlert('Error al crear usuario', e.message);
        }
      });
  }

  private edit() {
    this.isSaving = true;
    this.editarUsuariosUseCase.execute({
      previousId: this.editingUsuario?.id ?? -1,
      data: {
        id: this.form.controls.id.value ?? -1,
        nombres: this.form.controls.nombres.value ?? '',
        apellidos: this.form.controls.apellidos.value ?? '',
        ci: this.form.controls.ci.value ?? '',
        password: this.form.controls.password.value ?? '',
        activo: this.form.controls.activo.value ?? true
      }
    }).pipe(
      finalize(() => this.isSaving = false)
    )
      .subscribe({
        next: (savedUsuario) => {
          this.showSuccessAlert('Usuario editado');
          this.loadFormData(savedUsuario);
          this.savedUsuario.emit(savedUsuario)
          this.editingUsuario = savedUsuario
        },
        error: (e) => {
          console.error(e);
          this.showErrorAlert('Error al editar usuario', e.message);
        }
      })
  }

  private loadFormData(usuario: Usuario) {
    this.form.controls.id.setValue(usuario.id);
    this.form.controls.nombres.setValue(usuario.nombres);
    this.form.controls.apellidos.setValue(usuario.apellidos);
    this.form.controls.ci.setValue(usuario.ci);
    this.form.controls.password.setValue(usuario.password);
    this.form.controls.activo.setValue(usuario.activo);
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
