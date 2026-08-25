import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExecutiveEdgeComponent } from "../layouts/executive-edge/executive-edge.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '', component: ExecutiveEdgeComponent,

        children: [
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' }, title: 'Dashboard' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }