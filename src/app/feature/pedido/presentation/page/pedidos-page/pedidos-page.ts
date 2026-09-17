import { Component } from '@angular/core';
import { FeatureLayout } from '@core/presentation/layout/feature-layout/feature-layout';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { Pedido } from '../../../application/model/pedido.model';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-pedidos-page',
  imports: [FeatureLayout, NzTableModule],
  templateUrl: './pedidos-page.html',
  styleUrl: './pedidos-page.scss'
})
export class PedidosPage {
  pedidos: Pedido[] = [];

  readonly toolbarButtons: ToolbarButton[] = [
      {
        label: 'Agregar',
        icon: 'plus',
        type: 'primary',
        //actionFn: () => this.newProducto()
      },
      {
        label: 'Recargar',
        icon: 'reload',
        type: 'default',
        //actionFn: () => this.loadData()
      }
    ]
}
