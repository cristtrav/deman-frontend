import { Routes } from '@angular/router';
import { MainLayout } from './core/presentation/layout/main-layout/main-layout';
import { Dashboard } from './feature/dashboard/presentation/page/dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
    { path: 'app', redirectTo: '/app/dashboard', pathMatch: 'full' },
    {
        path: 'app', component: MainLayout, data: { breadcrumb: 'App'}, children: [
            { path: 'dashboard', component: Dashboard }
        ]
    }
];
