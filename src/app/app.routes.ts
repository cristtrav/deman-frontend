import { Routes } from '@angular/router';
import { MainLayout } from './core/presentation/layout/main-layout/main-layout';

export const routes: Routes = [
    { path: 'app', component: MainLayout, data: { breadcrumb: 'App'} }
];
