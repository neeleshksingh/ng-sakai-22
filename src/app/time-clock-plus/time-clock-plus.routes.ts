import { Routes } from '@angular/router';

export const TIME_CLOCK_PLUS_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./components/dashboard/dashboard/dashboard.component').then((m) => m.TimeClockPlusDashboardComponent), title: 'TimeClock Plus' },
    { path: 'masters', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Leave Masters' } },
    { path: 'transactions', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Leave Transactions' } },
    { path: 'workflow', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Leave Workflow' } },
    { path: 'reports', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Leave Reports' } }
];
