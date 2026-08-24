import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DocumentCenter } from 'src/app/shared/models/executiveedge/DocumentCenter';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentCenterService  extends GenericService<DocumentCenter, DocumentCenter>{
  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "DocumentCenter", environment.apiExecutiveEdgeUrl);
}


  getByDepartmentNames(depatments: string[]) {
    return this.http.post<DocumentCenter[]>(environment.apiGlobalUrl + '/DocumentCenter/GetByDepartmentNames', depatments);
  }

  uploadDocumentByDocumentCentreId(id: number, formData: FormData) {
    return this.http.post<DocumentCenter>(environment.apiExecutiveEdgeUrl + '/DocumentCenter/Upload/' + id, formData);
  }
}
