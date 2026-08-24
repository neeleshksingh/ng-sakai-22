import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BigLeadsRoutingModule } from './big-leads-routing.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    BigLeadsRoutingModule
  ]
})
export class BigLeadsModule { }