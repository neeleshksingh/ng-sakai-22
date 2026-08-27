import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AuthGuard } from './app/shared/guard/auth-guard.guard';
import { SurveyPendingGuard } from './app/shared/guard/survey-pending.guard';
import { Roles } from './app/shared/models/commons/user-roles';
import { LoadingService } from './app/shared/services/loading.service';

export const appsRoutes: Routes = [
    {
        path: '', loadComponent: () => import('./app/home/components/header/header.component').then(m => m.HeaderComponent), title: 'Home',
        children: [
            { path: '', loadChildren: () => import('./app/idp/idp.module').then(m => m.IdpModule) },
            { path: 'login', loadComponent: () => import('./app/idp/components/login/login.component').then(m => m.LoginComponent), title: 'Login' },
            { path: 'home', loadComponent: () => import('./app/home/components/home/home.component').then(m => m.HomeComponent), title: 'Home' },
            // { path: 'career', loadChildren: () => import('./career/career.module').then(mod => mod.CareerModule) },
            // { path: 'admissions/student-onboarding', loadChildren: () => import('./student-onboarding/student-onboarding.module').then(mod => mod.StudentOnboardingModule) },
        ]
    },
    {
        path: 'home', component: AppLayout,
        canActivate: [AuthGuard],
        canActivateChild: [SurveyPendingGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./app/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
                data: {
                    breadcrumb: 'Dashboard'
                }
            },
            {
                path: 'cloudbytes',
                loadChildren: () => import('./app/cloud-bytes/cloud-bytes.module').then(m => m.CloudBytesModule),
                data: {
                    breadcrumb: 'CloudBytes',
                    userRoles: [Roles.MASTERS, Roles.MASTERSADMIN, Roles.MASTERSSUPERADMIN, Roles.ITSUPPORTS, Roles.SUPERADMIN, Roles.ADMINISTRATION],
                }
            },
            {
                path: 'finpro',
                loadChildren: () => import('./app/finance-Pro/finance-pro.module').then(m => m.FinanceProModule),
                data: {
                    breadcrumb: 'FinPro',
                    userRoles: [Roles.ACCOUNTS, Roles.ACCOUNTSADMIN, Roles.ACCOUNTSSUPERADMIN, Roles.ITSUPPORTS, Roles.ITSUPPORTSSUPERADMIN, Roles.SUPERADMIN, Roles.ADMINISTRATION],
                }
            },
            {
                path: 'smallbizgurus',
                loadChildren: () => import('./app/smallbiz-gurus/smallbiz-gurus.module').then(m => m.SmallbizGurusModule),
                data: {
                    breadcrumb: 'SmallBizGurus',
                    userRoles: [Roles.HR, Roles.HRAdmin, Roles.HRReadWriteAccess, Roles.ITSUPPORTS, Roles.HRSuperAdmin, Roles.SUPERADMIN, Roles.ADMINISTRATION],
                }
            },
            {
                path: 'bigleads',
                loadChildren: () => import('./app/big-leads/big-leads.module').then(m => m.BigLeadsModule),
                data: {
                    breadcrumb: 'BigLeads',
                    userRoles: [Roles.LEADS, Roles.LEADSADMIN, Roles.FACULTY, Roles.HR, Roles.ACADEMICS, Roles.ACADEMICSADMIN, Roles.ITSUPPORTS, Roles.SUPERADMIN, Roles.ADMINISTRATION],
                }
            },
            {
                path: 'mindspark',
                loadChildren: () => import('./app/mind-spark/mind-spark.module').then(m => m.MindSparkModule),
                data: {
                    breadcrumb: 'MindSpark',
                    userRoles: [Roles.ACADEMICS, Roles.ACADEMICSADMIN, Roles.FACULTY, Roles.ITSUPPORTS, Roles.MASTERS, Roles.MASTERSADMIN, Roles.SUPERADMIN, Roles.ADMINISTRATION],
                }
            },
            {
                path: 'digitalfingers',
                loadChildren: () => import('./app/digital-fingers/digital-fingers.module').then(m => m.DigitalFingersModule),
                data: {
                    breadcrumb: 'DigitalFingers',
                    userRoles: [Roles.ITSUPPORTS, Roles.ITSUPPORTSSUPERADMIN, Roles.SUPERADMIN, Roles.ADMINISTRATION],
                }
            },
            {
                path: 'knowledgestand',
                loadChildren: () => import('./app/knowledge-stand/knowledge-stand.module').then(m => m.KnowledgeStandModule),
                data: {
                    breadcrumb: 'KnowledgeStand',
                    userRoles: [Roles.EXAMINATIONS, Roles.EXAMINATIONSADMIN, Roles.FACULTY, Roles.ITSUPPORTS, Roles.ITSUPPORTSSUPERADMIN, Roles.SUPERADMIN, Roles.ADMINISTRATION],
                }
            },
            {
                path: 'executiveedge',
                loadChildren: () => import('./app/executive-edge/executive-edge.module').then(m => m.ExecutiveEdgeModule),
                data: {
                    breadcrumb: 'ExecutiveEdge',
                    userRoles: [Roles.FACULTY, Roles.ITSUPPORTS, Roles.ITSUPPORTSSUPERADMIN, Roles.SUPERADMIN, Roles.ADMINISTRATION],
                }
            },
            // {
            //     path: 'timeclockplus',
            //     loadChildren: () => import('./time-clock-plus/time-clock-plus/time-clock-plus.module').then(mod => mod.TimeClockPlusModule),
            //     data: {
            //         breadcrumb: 'TimeClock Plus',
            //         userRoles: [Roles.ACADEMICS, Roles.EXAMINATIONS, Roles.FACULTY, Roles.ACCOUNTS, Roles.HR, Roles.DEVELOPERS, Roles.ITSUPPORTS, Roles.LEADS, Roles.MASTERS, Roles.SUPERADMIN, Roles.ADMINISTRATION]
            //     },
            // },
            // {
            //     path: 'virtuallearn',
            //     loadChildren: () => import('./virtual-learn/virtual-learn/virtual-learn.module').then(mod => mod.VirtualLearnModule),
            //     data: {
            //         breadcrumb: 'Virtual Learn',
            //         userRoles: [Roles.VIRTUALLEARN, Roles.VIRTUALLEARNSUPERADMIN, Roles.VIRTUALLEARNADMIN, Roles.ACADEMICS, Roles.EXAMINATIONS, Roles.FACULTY, Roles.ACCOUNTS, Roles.HR, Roles.DEVELOPERS, Roles.ITSUPPORTS, Roles.LEADS, Roles.MASTERS, Roles.SUPERADMIN, Roles.ADMINISTRATION]
            //     },
            // },
            // {
            //     path: 'students',
            //     loadChildren: () => import('./students/students.module').then(mod => mod.StudentsModule),
            //     data: {
            //         breadcrumb: 'Students',
            //         userRoles: [Roles.STUDENT]
            //     }
            // },
            {
                path: 'developers',
                loadChildren: () => import('./app/developers/developers.module').then(mod => mod.DevelopersModule),
                data: {
                    breadcrumb: 'Developers',
                    userRoles: [Roles.DEVELOPERS]
                }
            },
            // {
            //     path: 'settings', loadChildren: () => import('./settings/settings/settings.module').then(mod => mod.SettingsModule)
            // },
        ]
    },

    // { path: '**', loadComponent: () => import('./global/components/exception-pages/not-found/not-found.component').then(m => m.NotFoundComponent), data: { title: 'NotFound' } },
];

export class AppRoutingModule {
    constructor(private router: Router, private loaderService: LoadingService) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                this.loaderService.show();
            }

            if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.loaderService.hide();
            }
        });
    }
}