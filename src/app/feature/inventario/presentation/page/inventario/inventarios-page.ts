import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FeatureLayout } from "@core/presentation/layout/feature-layout/feature-layout";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFlexDirective } from "ng-zorro-antd/flex";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Inventario } from '../../../application/model/inventario.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ConsultarInventariosUseCase } from '../../../application/usecase/consultar-inventarios.usecase';
import { finalize } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { EliminarInventarioUseCase } from '../../../application/usecase/eliminar-inventario.dto';
import { UnidadMedidaAbrPipe } from '../../pipe/unidad-medida-abr-pipe';
import { formatDate } from '@angular/common';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-inventario',
  imports: [
    FeatureLayout,
    NzTableModule,
    NzButtonModule,
    NzFlexDirective,
    NzIconModule,
    NzTagModule,
    DatePipe,
    DecimalPipe,
    RouterLink,
    NzModalModule,
    UnidadMedidaAbrPipe,
    NzTypographyModule
],
  templateUrl: './inventarios-page.html',
  styleUrl: './inventarios-page.scss'
})
export class InventariosPage implements OnInit {

  readonly toolbarButtons: ToolbarButton[] = [
    {
      label: 'Agregar',
      type: 'primary',
      icon: 'plus',
      actionFn: () => this.newInventario()
    },
    {
      label: 'Recargar',
      type: 'default',
      icon: 'reload',
      actionFn: () => this.cargarDatos()
    }
  ]

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) this.expandSet.add(id);
    else this.expandSet.delete(id);
  }

  isLoading: boolean = false;
  inventarios: Inventario[] = [];

  private unidadMedidaAbr = new UnidadMedidaAbrPipe();

  constructor(
    @Inject(LOCALE_ID)
    private locale: string, 
    private consultarInventariosUseCase: ConsultarInventariosUseCase,
    private eliminarInventarioUseCase: EliminarInventarioUseCase,
    private router: Router,
    private aroute: ActivatedRoute,
    private notif: NzNotificationService,
    private modal: NzModalService,
  ){}

  ngOnInit(): void {
    this.cargarDatos();
  }

  private newInventario(){
    this.router.navigate(['nuevo'], { relativeTo: this.aroute})
  }

  cargarDatos(){
    this.isLoading = true;
    this.consultarInventariosUseCase.execute({
      sort: {
        field: 'id',
        order: 'desc'
      }
    })
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: result => this.inventarios = result.data,
      error: e => {
        console.error('Error al cargar inventarios', e);
        this.notif.error('Error al cargar inventarios', e.message);
      }
    })
  }

  confirmDelete(inventario: Inventario){
    this.modal.confirm({
      nzTitle: '¿Desea eliminar el inventario?',
      nzContent:
      `<div>Fecha: ${ formatDate(inventario.fecha, 'dd/MM/yyyy', this.locale) }</div>
      <div>Items:k
      </div>
      <ul>
        ${inventario.detalles.reduce((acc, current) => {
          return acc + '<li>' + current.producto.descripcion + ' - ' + current.cantidad + ' ' + this.unidadMedidaAbr.transform(current.producto.unidadMedida, current.cantidad) +  '</li>'
        }, '')}
      </ul>`,
      nzOkDanger: true,
      nzOnOk: () => this.delete(inventario.id)
    })
  }

  delete(id: number){
    this.eliminarInventarioUseCase.execute({data: {id}})
    .subscribe({
      next: () => {
        this.notif.success('Éxito', 'Inventario eliminado');
        this.cargarDatos();
      },
      error: e => {
        console.error('Error al eliminar inventario', e.message);
        this.notif.error('Error al eliminar inventario', e.message);
      }
    })
  }
}
