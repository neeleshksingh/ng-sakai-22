import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SmallbizzGurusComponent } from "../layouts/smallbizz-gurus/smallbizz-gurus.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '', component: SmallbizzGurusComponent,

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
