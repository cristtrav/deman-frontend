import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ClienteForm } from '../../component/cliente-form/cliente-form';
import { Cliente } from '../../../application/model/cliente.model';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ConsultarClienteUseCase } from '../../../application/usecase/consultar-cliente.usecase';
import { EliminarClienteUseCase } from '../../../application/usecase/eliminar-cliente.usecase';
import { finalize } from 'rxjs';
import { QueryContract } from '@core/application/contract/query/query.contract';
import { FeatureLayout } from '@core/presentation/layout/feature-layout/feature-layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'clientes-page',
  imports: [
    FeatureLayout,
    NzTableModule,
    NzFlexDirective,
    NzButtonModule, 
    NzModalModule,
    NzIconModule,
    ClienteForm
  ],
  templateUrl: './clientes-page.html',
  styleUrl: './clientes-page.scss'
})
export class ClientesPage implements OnInit {
  @ViewChild(ClienteForm)
  clienteFormComp!: ClienteForm;

  @Input()
  formMode: 'add' | 'edit' = 'add';
  modalTitleText = 'crear';
  editingCliente?: Cliente;

  clientes: Cliente[] = []
  isLoading: boolean = false;
  isSaving: boolean = false;
  isModalFormVisible = false;
  private search = '';
  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Agregar',
      type: 'primary',
      icon: 'plus',
      actionFn: () => this.newCliente()
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
    readonly consultarClienteUseCase: ConsultarClienteUseCase,
    readonly eliminarClienteUseCase: EliminarClienteUseCase,
    readonly modal: NzModalService,
    readonly notif: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.cargarDatos()
  }

  newCliente() {
    this.formMode = 'add'
    delete this.editingCliente;
    this.showModalForm()
  }

  editCliente(cliente:Cliente){
    this.formMode = 'edit';
    this.editingCliente = cliente;
    this.showModalForm();
  }
  public cargarDatos(){
      this.isLoading = true;
      this.consultarClienteUseCase.execute(this.getQuery())
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(clientes => this.clientes = clientes)
    }
    getQuery(): QueryContract{
        return {
          sort: {
            field: 'id',
            order: 'asc'
          },
          search: this.search ? {
            q: this.search,
            fields: ['descripcion']
          } : undefined
        }
      }

    showModalForm(){
    this.isModalFormVisible = true;
  }

  hideModalForm(){
    this.isModalFormVisible = false;
  }

  onSaved(){
    this.cargarDatos();
  }
  confirmDelete(cliente: Cliente){
      this.modal.confirm({
        nzTitle: '¿Desea eliminar el cliente?',
        nzContent: `${cliente.id} - ${cliente.razonSocial}`,
        nzOkDanger: true,
        nzOkText: 'Eliminar',
        nzOnOk: () => this.delete(cliente.id)
      })
    }
  
    delete(id: number){
      this.eliminarClienteUseCase.execute({data: id})
        .subscribe({
          next: () => {
            this.notif.success('Cliente eliminado','');
            this.cargarDatos();
          },
          error: (e) => {
            console.error('Error al eliminar el cliente', e);
            this.notif.error('Error al eliminar el cliente', e.message);
          }
        })
    }
}
