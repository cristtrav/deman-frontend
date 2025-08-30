import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FeatureLayout } from '@core/presentation/layout/feature-layout/feature-layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ConsultarMarcasUseCase } from '../../../application/usecase/consultar-marcas.usecase';
import { Marca } from '../../../application/model/marca.model';
import { finalize } from 'rxjs';
import { NzFlexDirective } from "ng-zorro-antd/flex";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { QueryContract } from '@core/application/contract/query/query.contract';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { MarcaForm } from "../../component/marca-form/marca-form";
import { EliminarMarcaUseCase } from '../../../application/usecase/eliminar-marca.usecase';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'marcas-page',
  imports: [
    FeatureLayout,
    NzTableModule,
    NzFlexDirective,
    NzButtonComponent,
    NzIconModule,
    NzModalModule,
    MarcaForm
],
  templateUrl: './marcas.page.html',
  styleUrl: './marcas.page.scss'
})
export class MarcasPage implements OnInit {

  @ViewChild(MarcaForm)
  marcaFormComp!: MarcaForm;

  @Input()
  formMode: 'add' | 'edit' = 'add';
  
  modalTitleText = 'crear';
  editingMarca?: Marca;

  marcas: Marca[] = [];
  isLoading: boolean = false;
  isSaving: boolean = false;
  isModalFormVisible = false;
  private search = '';

  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Agregar',
      type: 'primary',
      icon: 'plus',
      actionFn: () => this.newMarca()
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
    readonly consultarMarcasUseCase: ConsultarMarcasUseCase,
    readonly eliminarMarcaUseCase: EliminarMarcaUseCase,
    readonly modal: NzModalService,
    readonly notif: NzNotificationService
  ){}

  ngOnInit(): void {
    this.cargarDatos();
  }

  public cargarDatos(){
    this.isLoading = true;
    this.consultarMarcasUseCase.execute(this.getQuery())
    .pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(marcas => this.marcas = marcas)
  }

  getQuery(): QueryContract{
    return {
      search: this.search ? {
        q: this.search,
        fields: ['descripcion']
      } : undefined
    }
  }

  newMarca(){
    this.formMode = 'add'
    delete this.editingMarca;
    this.showModalForm();
  }

  editMarca(marca: Marca){
    this.formMode = 'edit';
    this.editingMarca = marca;
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

  confirmDelete(marca: Marca){
    this.modal.confirm({
      nzTitle: '¿Desea eliminar la marca?',
      nzContent: `${marca.id} - ${marca.descripcion}`,
      nzOkDanger: true,
      nzOkText: 'Eliminar',
      nzOnOk: () => this.delete(marca.id)
    })
  }

  delete(id: number){
    this.eliminarMarcaUseCase.execute({data: id})
      .subscribe({
        next: () => {
          this.notif.success('Marca eliminada','');
          this.cargarDatos();
        },
        error: (e) => {
          console.error('Error al eliminar marca', e);
          this.notif.error('Error al eliminar marca', e.message);
        }
      })
  }

}
