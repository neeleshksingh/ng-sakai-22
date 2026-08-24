import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExaminationProgram } from 'src/app/shared/models/knowledge-stand/examination-program';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExaminationProgramService extends GenericGlobalService<ExaminationProgram, ExaminationProgram> {

  constructor(http: HttpClient, messageService: MessageService) {
      super(http, messageService, "ExaminationProgram", environment.apiGlobalUrl);
  }
    getByExaminationId(examinationId: number) {
        return this.http.get<ExaminationProgram[]>(environment.apiGlobalUrl + '/ExaminationProgram/GetByExaminationId/' + examinationId);
    }
}
