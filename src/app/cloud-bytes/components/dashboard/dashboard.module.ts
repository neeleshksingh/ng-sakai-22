import { NgModule } from '@angular/core';
import { BarGraphSkeletonComponent } from 'src/app/global/components/skeletons/bar-graph-skeleton/bar-graph-skeleton.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@/shared.module';

@NgModule({
    imports: [
        SharedModule,
        DashboardComponent,
        DashboardRoutingModule,
        BarGraphSkeletonComponent
    ],
    declarations: [],
    providers: [],

    exports: [
        SharedModule,
        DashboardComponent,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }