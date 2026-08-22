import { Routes } from '@angular/router';

export const DIGITAL_FINGERS_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./components/dashboard/dashboard/dashboard.component').then((m) => m.DigitalFingersDashboardComponent), title: 'Digital Fingers' },
    { path: 'masters', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Identity Masters' } },
    { path: 'transactions', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'User Administration' } },
    { path: 'reports', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Identity Reports' } }
];
