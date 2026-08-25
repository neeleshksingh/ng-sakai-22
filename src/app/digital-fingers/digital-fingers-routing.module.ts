import { NgModule } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';

const routes: Routes = [
    { path: '', data: { breadcrumb: 'Dashboard' }, loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
    // { path: 'masters', data: { breadcrumb: 'Masters' }, loadChildren: () => import('../components/masters/masters.module').then(m => m.MastersModule) },
    // { path: 'transactions', data: { breadcrumb: 'Transactions' }, loadChildren: () => import('../components/transactions/transactions.module').then(m => m.TransactionsModule) },
    // { path: 'reports', data: { breadcrumb: 'Reports' }, loadChildren: () => import('../components/reports/reports.module').then(m => m.ReportsModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DigitalFingersRoutingModule { }