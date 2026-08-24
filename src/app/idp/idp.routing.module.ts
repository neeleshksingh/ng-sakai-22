import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guard/auth-guard.guard";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";

const routes: Routes = [
    { path: '', component: LoginComponent, title: 'Login' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'logout', component: LogoutComponent, title: 'Logout', canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IdpRoutingModule { }
