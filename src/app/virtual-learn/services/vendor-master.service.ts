import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorMaster } from 'src/app/shared/models/virtuallearn/vendor-master';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorMasterService extends GenericServiceNols<VendorMaster, VendorMaster> {

  constructor(http: HttpClient) {
    super(http, "VendorMaster", environment.apiVirtualLearnUrl);
  }
}