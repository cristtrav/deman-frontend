import { Routes } from "@angular/router";

export const pedidosRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./page/pedidos-page/pedidos-page').then(m => m.PedidosPage),
        data: { breadcrumb: 'Pedidos' },
    }
]
