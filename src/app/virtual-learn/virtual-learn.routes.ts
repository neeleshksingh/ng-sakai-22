import { Routes } from '@angular/router';

export const VIRTUAL_LEARN_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./components/dashboard/dashboard/dashboard.component').then((m) => m.VirtualLearnDashboardComponent), title: 'Virtual Learn' },
    { path: 'masters', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Library Masters' } },
    { path: 'transactions', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Library Transactions' } },
    { path: 'reports', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Library Reports' } }
];
