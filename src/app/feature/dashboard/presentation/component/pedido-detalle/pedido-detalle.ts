import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Pedido } from '../../../domain/model/pedido.model';

@Component({
  selector: 'dashboard-pedido-detalle',
  imports: [DatePipe, DecimalPipe, NzDescriptionsModule, NzButtonModule, NzIconModule, NzTagModule],
  templateUrl: './pedido-detalle.html',
  styleUrl: './pedido-detalle.scss'
})
export class PedidoDetalle {
  readonly pedido = inject<Pedido>(NZ_MODAL_DATA);
  private readonly modalRef = inject(NzModalRef);
  private readonly modal = inject(NzModalService);
  private readonly router = inject(Router);

  irAlPedido() {
    // También cierra el listado de "Ver más" si el detalle se abrió desde ahí
    this.modal.closeAll();
    this.router.navigate(['/app/pedidos', this.pedido.id]);
  }

  cerrar() { this.modalRef.close(); }
}

export function abrirDetallePedido(modal: NzModalService, pedido: Pedido) {
  modal.create<PedidoDetalle, Pedido>({
    nzTitle: `Pedido N° ${pedido.id}`,
    nzContent: PedidoDetalle,
    nzData: pedido,
    nzFooter: null,
    nzWidth: 560
  });
}
