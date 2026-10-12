import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProximasEntregasFacade } from '../../../application/facade/proximas-entregas.facade';
import { Pedido, PeriodoEntrega } from '../../../domain/model/pedido.model';
import { abrirDetallePedido } from '../pedido-detalle/pedido-detalle';

const TAMANO_PAGINA = 10;

// Listado completo y paginado de un periodo: se abre con "Ver más"
@Component({
  selector: 'dashboard-proximas-entregas-tabla',
  imports: [DatePipe, NzTableModule, NzButtonModule, NzIconModule],
  providers: [ProximasEntregasFacade],
  templateUrl: './proximas-entregas-tabla.html',
  styles: '.vencida { color: #ff4d4f; }'
})
export class ProximasEntregasTabla {
  readonly facade = inject(ProximasEntregasFacade);
  private readonly modal = inject(NzModalService);
  readonly periodo = inject<PeriodoEntrega>(NZ_MODAL_DATA);

  constructor() {
    this.facade.pageSize.set(TAMANO_PAGINA);
    this.facade.periodo.set(this.periodo);
  }

  onQueryParams(params: NzTableQueryParams) {
    this.facade.page.set(params.pageIndex);
  }

  verDetalle(pedido: Pedido) {
    abrirDetallePedido(this.modal, pedido);
  }
}

export function abrirProximasEntregas(modal: NzModalService, periodo: PeriodoEntrega, titulo: string) {
  modal.create<ProximasEntregasTabla, PeriodoEntrega>({
    nzTitle: titulo,
    nzContent: ProximasEntregasTabla,
    nzData: periodo,
    nzFooter: null,
    nzWidth: 720
  });
}
