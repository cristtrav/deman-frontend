import { Component, Input, input, OnInit, ViewChild, viewChild } from '@angular/core';
import { FeatureLayout } from "@core/presentation/layout/feature-layout/feature-layout";
import { NzTableComponent, NzTableModule } from "ng-zorro-antd/table";
import { NzFlexDirective } from "ng-zorro-antd/flex";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalComponent, NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { ColorForm } from '../../component/color-form/color-form';
import { Color } from '../../../application/model/color.model';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { ConsultarColorUseCase } from '../../../application/usecase/consultar-color.usecase';
import { EliminarColorUseCase } from '../../../application/usecase/eliminar-color.usecase';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs';
import { QueryContract } from '@core/application/contract/query/query.contract';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'colores-page',
  imports: [
    FeatureLayout,
    NzTableModule,
    NzFlexDirective,
    NzButtonModule, 
    NzModalModule,
    NzIconModule,
    ColorForm
  ],
  templateUrl: './colores-page.html',
  styleUrl: './colores-page.scss'
})
export class ColoresPage implements OnInit {
  @ViewChild(ColorForm)
  colorFormComp!: ColorForm;

  @Input()
  formMode: 'add' | 'edit' = 'add';
  modalTitleText = 'crear';
  editingColor?: Color;

  colores: Color[] = []
  isLoading: boolean = false;
  isSaving: boolean = false;
  isModalFormVisible = false;
  private search = '';
  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Agregar',
      type: 'primary',
      icon: 'plus',
      actionFn: () => this.newColor()
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
    readonly consultarColorUseCase: ConsultarColorUseCase,
    readonly eliminarColorUseCase: EliminarColorUseCase,
    readonly modal: NzModalService,
    readonly notif: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.cargarDatos()
  }

  newColor() {
    this.formMode = 'add'
    delete this.editingColor;
    this.showModalForm()
  }

  editColor(color:Color){
    this.formMode = 'edit';
    this.editingColor = color;
    this.showModalForm();
  }
  public cargarDatos(){
      this.isLoading = true;
      this.consultarColorUseCase.execute(this.getQuery())
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(colores => this.colores = colores)
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
  confirmDelete(color: Color){
      this.modal.confirm({
        nzTitle: '¿Desea eliminar el color?',
        nzContent: `${color.id} - ${color.descripcion}`,
        nzOkDanger: true,
        nzOkText: 'Eliminar',
        nzOnOk: () => this.delete(color.id)
      })
    }
  
    delete(id: number){
      this.eliminarColorUseCase.execute({data: id})
        .subscribe({
          next: () => {
            this.notif.success('Color eliminado','');
            this.cargarDatos();
          },
          error: (e) => {
            console.error('Error al eliminar el color', e);
            this.notif.error('Error al eliminar el color', e.message);
          }
        })
    }

}
