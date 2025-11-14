import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FeatureLayout } from '@core/presentation/layout/feature-layout/feature-layout';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UsuarioForm } from '../../../../usuario/presentation/component/usuario-form/usuario-form';
import { Usuario } from '../../../application/model/usuario.model';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { ConsultarUsuariosUseCase } from '../../../application/usecase/consultar-usuario.usecase';
import { EliminarUsuarioUseCase } from '../../../application/usecase/eliminar-usuario.usecase';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs';
import { QueryContract } from '@core/application/contract/query/query.contract';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditarPasswordUseCase } from '../../../application/usecase/editar-password.usecase';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzAlertComponent, NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-usuarios',
  imports: [
    FeatureLayout,
    NzTableModule,
    NzFlexDirective,
    NzButtonComponent,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    ReactiveFormsModule,
    UsuarioForm,
    NzAlertModule
  ],
  templateUrl: './usuarios.page.html',
  styleUrl: './usuarios.page.scss'
})
export class UsuariosPage implements OnInit {
  @ViewChild(UsuarioForm)
  usuarioFormComp!: UsuarioForm;

  @Input()
  formMode: 'add' | 'edit' | 'editPassword' = 'add';

  @Input()
  editingPassword?: string;

  @Output()
  savedUsuario = new EventEmitter<Usuario>();

  @ViewChild('notifContainer', { read: ViewContainerRef })
  notifContainer!: ViewContainerRef;

  modalTitleText = 'crear';
  editingUsuario?: Usuario;
  passwordVisible = false;
  password?: string;

  usuarios: Usuario[] = [];
  isLoading: boolean = false;
  isSaving: boolean = false;
  isModalFormVisible = false;
  private search = '';

  form = new FormGroup({
    password: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)]),
  })

  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Agregar',
      type: 'primary',
      icon: 'plus',
      actionFn: () => this.newUsuario()
    },
    {
      label: 'Recargar',
      type: 'default',
      icon: 'reload',
      actionFn: () => this.cargarDatos()
    }
  ]

  readonly buscar = (query: string) => {
    this.search = query;
    this.cargarDatos();
  }

  constructor(
    readonly editarPasswordUseCase: EditarPasswordUseCase,
    readonly consultarUsuariosUseCase: ConsultarUsuariosUseCase,
    readonly eliminarUsuarioUseCase: EliminarUsuarioUseCase,
    readonly modal: NzModalService,
    readonly notif: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  public cargarDatos() {
    this.isLoading = true;
    this.consultarUsuariosUseCase.execute(this.getQuery())
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(usuarios => this.usuarios = usuarios)
  }

  getQuery(): QueryContract {
    return {
      search: this.search ? {
        q: this.search,
        fields: ['descripcion']
      } : undefined
    }
  }

  newUsuario() {
    this.formMode = 'add'
    delete this.editingUsuario;
    this.showModalForm();
  }

  editUsuario(usuario: Usuario) {
    this.formMode = 'edit';
    this.editingUsuario = usuario;
    this.showModalForm();
  }

  editPasswordMode(usuario: Usuario) {
    this.formMode = 'editPassword';
    this.editingUsuario = usuario;
    this.form.reset();
    this.showModalForm();
  }

   editPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.editarPasswordUseCase.execute({
      previousId: this.editingUsuario?.id ?? -1,
      data: this.form.value.password ?? '',
    })
      .pipe(finalize(() => (this.isSaving = false)) )
      .subscribe({
        next: () => {
          this.showSuccessAlert('Contraseña actualizada correctamente');
          this.cargarDatos();
        },
        error: (e) => {
          this.showErrorAlert('Error al editar contraseña', e.message);
        }
      });
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
  showModalForm() {
    this.isModalFormVisible = true;
  }

  hideModalForm() {
    this.isModalFormVisible = false;
  }

  onSaved() {
    this.cargarDatos();
  }

  confirmDelete(usuario: Usuario) {
    this.modal.confirm({
      nzTitle: '¿Desea eliminar la usuario?',
      nzContent: `${usuario.id} - ${usuario.nombres}`,
      nzOkDanger: true,
      nzOkText: 'Eliminar',
      nzOnOk: () => this.delete(usuario.id)
    })
  }

  delete(id: number) {
    this.eliminarUsuarioUseCase.execute({ data: id })
      .subscribe({
        next: () => {
          this.notif.success('Usuario eliminado', '');
          this.cargarDatos();
        },
        error: (e) => {
          console.error('Error al eliminar usuario', e);
          this.notif.error('Error al eliminar usuario', e.message);
        }
      })
  }

}
