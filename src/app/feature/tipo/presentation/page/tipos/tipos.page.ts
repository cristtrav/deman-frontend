import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TipoForm } from '../../component/tipo-form/tipo-form';
import { Tipo } from '../../../application/model/tipo.model';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { ConsultarTiposUsecase } from '../../../application/usecase/consultar-tipos.usecase';
import { EliminarTipoUseCase } from '../../../application/usecase/eliminar-tipo.usecase';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs';
import { QueryContract } from '@core/application/contract/query/query.contract';
import { FeatureLayout } from '@core/presentation/layout/feature-layout/feature-layout';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-tipos',
  imports: [
    FeatureLayout,
    NzTableModule,
    NzFlexDirective,
    NzButtonComponent,
    NzIconModule,
    NzModalModule,
    TipoForm
  ],
  templateUrl: './tipos.page.html',
  styleUrl: './tipos.page.scss'
})
export class TiposPage implements OnInit {
  @ViewChild(TipoForm)
  tipoFormComp!: TipoForm;

  @Input()
  formMode: 'add' | 'edit' = 'add';
  
  modalTitleText = 'crear';
  editingTipo?: Tipo;

  tipos: Tipo[] = [];
  isLoading: boolean = false;
  isSaving: boolean = false;
  isModalFormVisible = false;
  private search = '';

  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Agregar',
      type: 'primary',
      icon: 'plus',
      actionFn: () => this.newTipo()
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
    readonly consultarTiposUseCase: ConsultarTiposUsecase,
    readonly eliminarTipoUseCase: EliminarTipoUseCase,
    readonly modal: NzModalService,
    readonly notif: NzNotificationService
  ){}

  ngOnInit(): void {
    this.cargarDatos();
  }

  public cargarDatos(){
    this.isLoading = true;
    this.consultarTiposUseCase.execute(this.getQuery())
    .pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(tipos => this.tipos = tipos)
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

  newTipo(){
    this.formMode = 'add'
    delete this.editingTipo;
    this.showModalForm();
  }

  editTipo(tipo: Tipo){
    this.formMode = 'edit';
    this.editingTipo = tipo;
    this.showModalForm();
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

  confirmDelete(tipo: Tipo){
    this.modal.confirm({
      nzTitle: '¿Desea eliminar el tipo?',
      nzContent: `${tipo.id} - ${tipo.descripcion}`,
      nzOkDanger: true,
      nzOkText: 'Eliminar',
      nzOnOk: () => this.delete(tipo.id)
    })
  }

  delete(id: number){
    this.eliminarTipoUseCase.execute({data: id})
      .subscribe({
        next: () => {
          this.notif.success('Tipo eliminado','');
          this.cargarDatos();
        },
        error: (e) => {
          console.error('Error al eliminar el tipo', e);
          this.notif.error('Error al eliminar el tipo', e.message);
        }
      })
  }
}
