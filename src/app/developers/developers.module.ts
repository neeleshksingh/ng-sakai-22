import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DevelopersRoutingModule } from './developers-routing.module';



@NgModule({
  declarations: [],
  imports: [
    DevelopersRoutingModule
  ],
  providers:[MessageService]
})
export class DevelopersModule { }
