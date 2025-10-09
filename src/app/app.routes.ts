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
                data: { breadcrumb: 'Marcas'}
            },
            {
                path: 'colores',
                loadComponent: () => import('./feature/color/presentation/page/colores-page/colores-page').then(c => c.ColoresPage),
                data: { breadcrumb: 'Colores'}
            }
        ]
    }
];
