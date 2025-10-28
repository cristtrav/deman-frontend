import { Component, OnInit } from '@angular/core';
import { FeatureLayout } from "@core/presentation/layout/feature-layout/feature-layout";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFlexDirective } from "ng-zorro-antd/flex";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventario } from '../../../application/model/inventario.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ConsultarInventariosUseCase } from '../../../application/usecase/consultar-inventarios.usecase';
import { finalize } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';

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
    DecimalPipe
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
  
  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private notif: NzNotificationService,
    private consultarInventariosUseCase: ConsultarInventariosUseCase
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
}
