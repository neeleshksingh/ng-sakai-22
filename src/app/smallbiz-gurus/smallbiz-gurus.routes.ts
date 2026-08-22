import { Routes } from '@angular/router';

export const SMALLBIZ_GURUS_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./components/dashboard/dashboard/dashboard.component').then((m) => m.SmallbizGurusDashboardComponent), title: 'SmallBiz Gurus' },
    { path: 'employees', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Employees' } },
    { path: 'masters', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'HR Masters' } },
    { path: 'payroll', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Payroll' } },
    { path: 'recruitment', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Recruitment' } },
    { path: 'reports', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'HR Reports' } }
];
