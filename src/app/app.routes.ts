import { Routes } from '@angular/router';
import { MainLayout } from './core/presentation/layout/main-layout/main-layout';
import { Dashboard } from './feature/dashboard/presentation/page/dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
    { path: 'app', redirectTo: '/app/dashboard', pathMatch: 'full' },
    {
        path: 'app', component: MainLayout, data: { breadcrumb: 'App'}, children: [
            { path: 'dashboard', component: Dashboard, data: { breadcrumb: 'Dashboard' } },
            {
                path: 'marcas',
                loadComponent: () => import('./feature/marca/presentation/page/marcas/marcas.page').then(m => m.MarcasPage),
                data: { breadcrumb: 'Marcas' }
            },
            {
                path: 'productos',
                loadComponent: () => import('./feature/producto/presentation/page/productos-page/productos-page').then(m => m.ProductosPage),
                data: { breadcrumb: 'Productos' }
            },
            {
                path: 'inventarios',
                loadComponent: () => import('./feature/inventario/presentation/page/inventario/inventarios-page').then(m => m.InventariosPage),
                data: { breadcrumb: 'Inventarios' },
            },
            {
                path: 'inventarios/:id',
                loadComponent: () => import('./feature/inventario/presentation/page/detalle-inventario-page/detalle-inventario-page').then(m => m.DetalleInventarioPage),
                data: { breadcrumb: 'Detalle Inventario' },
            }
            
        ]
    }
];
