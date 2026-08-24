import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from 'src/app/shared/services/generic.service';
import { MessageService } from 'primeng/api';
import { Permissions } from 'src/app/shared/models/digital-fingers/permissions';
import { UserPermission } from 'src/app/shared/models/digital-fingers/userPermission';

@Injectable({
  providedIn: 'root'
})

export class UserPermissionsService extends GenericService<UserPermission, UserPermission>{

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "UserPermission", environment.apiDigitalFingersUrl);
  }

  // getByUserName(userName:string) {
  //   return this.http.get<UserPermission[]>(environment.apiDigitalFingersUrl + `/UserPermission/GetByUserName/${userName}`);
  // }

}