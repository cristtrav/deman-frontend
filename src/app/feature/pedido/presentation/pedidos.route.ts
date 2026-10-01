import { Routes } from "@angular/router";

export const pedidosRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./page/pedidos-page/pedidos-page').then(m => m.PedidosPage),
        data: { breadcrumb: 'Pedidos' },
    },
    {
        path: ':idPedido',
        loadComponent: () => import('../../pago/presentation/page/detalle-pedido-page/detalle-pedido-page').then(m => m.DetallePedidoPage),
        data: { breadcrumb: 'Detalle Pedido' },
    }
]
