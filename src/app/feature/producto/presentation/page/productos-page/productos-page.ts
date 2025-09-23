import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FeatureLayout } from '@core/presentation/layout/feature-layout/feature-layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Producto } from '../../../application/model/producto.model';
import { ConsultarProductosUseCase } from '../../../application/usecase/consultar-productos.usecase';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { DecimalPipe } from '@angular/common';
import { QueryContract } from '@core/application/contract/query/query.contract';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from "ng-zorro-antd/flex";
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ProductoForm } from "../../component/producto-form/producto-form";
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { EliminarProductoUseCase } from '../../../application/usecase/eliminar-producto.usecase';

@Component({
  selector: 'productos-page',
  imports: [
    FeatureLayout,
    NzTableModule,
    DecimalPipe,
    NzIconModule,
    NzButtonModule,
    NzFlexModule,
    NzModalModule,
    ProductoForm,
    NzTooltipModule
],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.scss'
})
export class ProductosPage implements OnInit {

  @ViewChild(ProductoForm)
  productoForm!: ProductoForm;

  @Input()
  formMode: 'add' | 'edit' = 'add';

  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Agregar',
      icon: 'plus',
      type: 'primary',
      actionFn: () => this.newProducto()
    },
    {
      label: 'Recargar',
      icon: 'reload',
      type: 'default',
      actionFn: () => this.loadData()
    }
  ]

  isModalFormVisible: boolean = false;
  loading: boolean = false;
  isSaving: boolean = false;
  productos: Producto[] = [];
  private searchQuery: string = '';
  editingProducto?: Producto;

  readonly searchFn = (query: string) => {
    this.searchQuery = query;
    this.loadData();
  }

  constructor(
    private consultarProductosUseCase: ConsultarProductosUseCase,
    private eliminarProductoUseCase: EliminarProductoUseCase,
    private notif: NzNotificationService,
    private modal: NzModalService
  ){ }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const query: QueryContract = {};
    if(this.searchQuery) query.search = {
        q: this.searchQuery,
        fields: ['descripcion']
      }
    this.loading = true;
    this.consultarProductosUseCase.execute(query)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: result => {
        this.productos = result.data
      },
      error: e => {
        console.error('Error al cargar productos', e);
        this.notif.error('Error al cargar productos', e.message)
      }
    })
  }

  newProducto(){
    this.formMode = 'add';
    this.showModal();
  }

  editProducto(producto: Producto){
    this.formMode = 'edit';
    this.editingProducto = producto;
    this.showModal();
  }

  confirmDelete(producto: Producto){
    this.modal.confirm({
      nzTitle: '¿Desea eliminar el producto?',
      nzContent: `${producto.id} - ${producto.descripcion}`,
      nzOkDanger: true,
      nzOkText: 'Eliminar',
      nzOnOk: () => this.delete(producto.id)
    })
  }

  delete(id: number){
    this.eliminarProductoUseCase.execute({
      data: { id }
    }).subscribe({
      next: () => {
        this.loadData();
        this.notif.success('Producto eliminado', '');
      },
      error: e => {
        console.log('Error al eliminar producto', e);
        this.notif.error('Error al eliminar producto', e.message);
      }
    })
  }

  showModal(){ this.isModalFormVisible = true; }
  hideModal(){ this.isModalFormVisible = false; }

}
