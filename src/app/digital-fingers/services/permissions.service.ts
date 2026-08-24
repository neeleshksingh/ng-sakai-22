import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Permissions } from 'src/app/shared/models/digital-fingers/permissions';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PermissionsService extends GenericService<Permissions, Permissions>{

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "Permission", environment.apiDigitalFingersUrl);
  }
}