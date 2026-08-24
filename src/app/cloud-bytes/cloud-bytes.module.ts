import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CloudBytesRoutingModule } from './cloud-bytes-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CloudBytesRoutingModule
  ],
  providers: [MessageService]
})
export class CloudBytesModule { }
