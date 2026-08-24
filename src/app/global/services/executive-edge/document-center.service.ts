import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DocumentCenter } from 'src/app/shared/models/executiveedge/DocumentCenter';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentCenterService extends GenericGlobalService<DocumentCenter, DocumentCenter> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "DocumentCenter", environment.apiGlobalUrl);
  }
  getByDepartmentNames(depatments: string[]) {
    return this.http.post<DocumentCenter[]>(environment.apiGlobalUrl + '/DocumentCenter/GetByDepartmentNames', depatments);
  }
}