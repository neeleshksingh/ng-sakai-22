import { NgModule } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SmallBizGurusRoutingModule } from './smallbiz-gurus-routing.module';



@NgModule({
  declarations: [],
  imports: [
    SmallBizGurusRoutingModule
  ],
  providers: [
    DialogService
  ]
})
export class SmallbizGurusModule { }
