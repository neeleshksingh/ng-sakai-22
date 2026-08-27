import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { KnowledgeStandComponent } from "../layouts/knowledge-stand/knowledge-stand.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '', component: KnowledgeStandComponent,

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