import { Component, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ProximasEntregasFacade } from '../../../application/facade/proximas-entregas.facade';
import { Pedido, PeriodoEntrega } from '../../../domain/model/pedido.model';
import { abrirDetallePedido } from '../pedido-detalle/pedido-detalle';
import { abrirProximasEntregas } from '../proximas-entregas-tabla/proximas-entregas-tabla';

// Cantidad de pedidos que se muestran en la tarjeta; el resto, con "Ver más"
const MAXIMO_EN_TARJETA = 5;

@Component({
  selector: 'dashboard-proximas-entregas-card',
  imports: [DatePipe, NzCardModule, NzTableModule, NzButtonModule, NzIconModule, NzBadgeModule],
  providers: [ProximasEntregasFacade],
  templateUrl: './proximas-entregas-card.html',
  styleUrl: './proximas-entregas-card.scss'
})
export class ProximasEntregasCard {
  readonly periodo = input.required<PeriodoEntrega>();
  readonly titulo = input.required<string>();
  readonly textoVacio = input('No hay entregas pendientes');

  readonly facade = inject(ProximasEntregasFacade);
  private readonly modal = inject(NzModalService);

  constructor() {
    this.facade.pageSize.set(MAXIMO_EN_TARJETA);
    effect(() => this.facade.periodo.set(this.periodo()));
  }

  verDetalle(pedido: Pedido) {
    abrirDetallePedido(this.modal, pedido);
  }

  verMas() {
    abrirProximasEntregas(this.modal, this.periodo(), this.titulo());
  }
}
