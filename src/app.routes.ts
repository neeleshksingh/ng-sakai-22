import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { authGuard } from './app/shared/guard/auth-guard.guard';
import { surveyPendingGuard } from './app/shared/guard/survey-pending.guard';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home/dashboard' },
    { path: 'welcome', loadComponent: () => import('./app/home/components/home/home.component').then((m) => m.HomeComponent), title: 'NCorePro' },
    { path: 'login', loadComponent: () => import('./app/idp/components/login/login.component').then((m) => m.LoginComponent), title: 'Login' },
    { path: 'career', loadComponent: () => import('./app/shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Career Portal' } },
    { path: 'admissions/student-onboarding', loadComponent: () => import('./app/shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Student Onboarding' } },
    {
        path: 'home',
        component: AppLayout,
        canActivate: [authGuard],
        canActivateChild: [surveyPendingGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', loadComponent: () => import('./app/dashboard/components/dashboard/dashboard.component').then((m) => m.DashboardComponent), title: 'Dashboard' },
            { path: 'cloudbytes', loadChildren: () => import('./app/cloud-bytes/cloud-bytes.routes').then((m) => m.CLOUD_BYTES_ROUTES) },
            { path: 'bigleads', loadChildren: () => import('./app/big-leads/big-leads.routes').then((m) => m.BIG_LEADS_ROUTES) },
            { path: 'mindspark', loadChildren: () => import('./app/mind-spark/mind-spark.routes').then((m) => m.MIND_SPARK_ROUTES) },
            { path: 'knowledgestand', loadChildren: () => import('./app/knowledge-stand/knowledge-stand.routes').then((m) => m.KNOWLEDGE_STAND_ROUTES) },
            { path: 'finpro', loadChildren: () => import('./app/finance-Pro/finance-pro.routes').then((m) => m.FINANCE_PRO_ROUTES) },
            { path: 'smallbizgurus', loadChildren: () => import('./app/smallbiz-gurus/smallbiz-gurus.routes').then((m) => m.SMALLBIZ_GURUS_ROUTES) },
            { path: 'executiveedge', loadChildren: () => import('./app/executive-edge/executive-edge.routes').then((m) => m.EXECUTIVE_EDGE_ROUTES) },
            { path: 'digitalfingers', loadChildren: () => import('./app/digital-fingers/digital-fingers.routes').then((m) => m.DIGITAL_FINGERS_ROUTES) },
            { path: 'timeclockplus', loadChildren: () => import('./app/time-clock-plus/time-clock-plus.routes').then((m) => m.TIME_CLOCK_PLUS_ROUTES) },
            { path: 'virtuallearn', loadChildren: () => import('./app/virtual-learn/virtual-learn.routes').then((m) => m.VIRTUAL_LEARN_ROUTES) },
            { path: 'developers', loadChildren: () => import('./app/developers/developers.routes').then((m) => m.DEVELOPERS_ROUTES) },
            { path: 'students', loadComponent: () => import('./app/students/dashboard/dashboard.component').then((m) => m.StudentDashboardComponent), title: 'Student Portal' },
            { path: 'settings', loadComponent: () => import('./app/shared/components/placeholder-page/placeholder-page.component').then((m) => m.PlaceholderPageComponent), data: { title: 'Settings' } }
        ]
    },
    {
        path: 'access-denied',
        loadComponent: () => import('./app/global/components/exception-pages/exception-page/exception-page.component').then((m) => m.ExceptionPageComponent),
        data: { code: '403', title: 'Access denied', description: 'You do not have permission to access this workspace.', icon: 'pi pi-lock' }
    },
    {
        path: 'forbidden',
        loadComponent: () => import('./app/global/components/exception-pages/exception-page/exception-page.component').then((m) => m.ExceptionPageComponent),
        data: { code: '403', title: 'Forbidden access', description: 'This resource is restricted for your current role.', icon: 'pi pi-shield' }
    },
    {
        path: 'server-error',
        loadComponent: () => import('./app/global/components/exception-pages/exception-page/exception-page.component').then((m) => m.ExceptionPageComponent),
        data: { code: '500', title: 'Internal server error', description: 'A demonstration error occurred. Please return to the dashboard.', icon: 'pi pi-exclamation-triangle' }
    },
    {
        path: 'token-expired',
        loadComponent: () => import('./app/global/components/exception-pages/exception-page/exception-page.component').then((m) => m.ExceptionPageComponent),
        data: { code: '401', title: 'Session expired', description: 'Your demonstration login token has expired.', icon: 'pi pi-clock' }
    },
    {
        path: 'under-progress',
        loadComponent: () => import('./app/global/components/exception-pages/exception-page/exception-page.component').then((m) => m.ExceptionPageComponent),
        data: { code: 'WIP', title: 'Under construction', description: 'This module shell is ready and its detailed workflow is under development.', icon: 'pi pi-wrench' }
    },
    {
        path: '**',
        loadComponent: () => import('./app/global/components/exception-pages/exception-page/exception-page.component').then((m) => m.ExceptionPageComponent),
        data: { code: '404', title: 'Page not found', description: 'The page you requested does not exist.', icon: 'pi pi-compass' }
    }
];
