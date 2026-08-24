import { NgModule } from "@angular/core";
import { HomeComponent } from "../home/components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { IdpRoutingModule } from "./idp.routing.module";
import { SharedModule } from "@/shared.module";

@NgModule({
    declarations: [

    ],
    imports: [
        SharedModule,

        IdpRoutingModule,
        LoginComponent,
        HomeComponent,
        LogoutComponent,
    ],
    exports: [
        IdpRoutingModule,
        LoginComponent,
        HomeComponent,
        LogoutComponent
    ],

})
export class IdpModule { }
