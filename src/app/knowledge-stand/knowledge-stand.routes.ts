import { Routes } from '@angular/router';

export const KNOWLEDGE_STAND_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./components/dashboard/dashboard/dashboard.component').then((m) => m.KnowledgeStandDashboardComponent), title: 'Knowledge Stand' },
    { path: 'masters', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Examination Masters' } },
    { path: 'transactions', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Examination Transactions' } },
    { path: 'reports', loadComponent: () => import('../shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Examination Reports' } }
];
