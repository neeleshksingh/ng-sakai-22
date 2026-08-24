import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentExternalExaminationCreditTransfer, StudentExternalExaminationCreditTransferResponse } from 'src/app/shared/models/knowledge-stand/student-external-examination-credit-transfer';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class StudentExternalExaminationCreditTransferService extends GenericService<StudentExternalExaminationCreditTransfer, StudentExternalExaminationCreditTransferResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "StudentExternalExaminationCreditTransfer", environment.apiExaminationsUrl);
    }

    studentExternalExaminationCreditTransferGetByAcademicSessionProgramSemester(academicSessionId: number, programId: number, semesterId: number) {
        return this.http.get<StudentExternalExaminationCreditTransferResponse[]>(environment.apiExaminationsUrl + `/StudentExternalExaminationCreditTransfer/GetByAcademicSessionId/${academicSessionId}/programId/${programId}/semesterId/${semesterId}`)
    }
}
