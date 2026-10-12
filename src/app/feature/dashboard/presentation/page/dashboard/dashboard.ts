import { Component, computed, inject } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { SesionStore } from '../../../../auth/application/sesion.store';
import { PedidosPendientesFacade } from '../../../application/facade/pedidos-pendientes.facade';
import { ProximasEntregasCard } from '../../component/proximas-entregas-card/proximas-entregas-card';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  imports: [    
    NzCardComponent,
    NzFlexModule,
    NzTypographyModule,
    NzGridModule,
    NzStatisticModule,
    NzIconModule,
    NzButtonModule,
    RouterLink,
    ProximasEntregasCard
  ],
  providers: [PedidosPendientesFacade, NzModalService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private readonly sesionStore = inject(SesionStore);
  readonly pedidosPendientesFacade = inject(PedidosPendientesFacade);

  protected readonly nombreUsuario = computed(() => this.sesionStore.usuario()?.nombres ?? '');
}
