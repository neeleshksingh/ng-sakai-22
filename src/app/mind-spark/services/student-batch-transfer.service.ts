import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentBatchTransfer } from 'src/app/shared/models/mindspark/student-batch-transfer';
import { StudentBatchTransferByRegistration } from 'src/app/shared/models/mindspark/student-batch-transfer-by-registration';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class StudentBatchTransferService extends GenericService<StudentBatchTransfer, StudentBatchTransfer> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "StudentBatchTransfer", environment.apiAcademicsUrl);
    }
    
    getByToBatchCode(batchCode: string) {
        return this.http.get<StudentBatchTransfer[]>(environment.apiAcademicsUrl + '/StudentBatchTransfer/GetByToBatchCode/' + batchCode);
    }

    getStudentBatchTransferToBeTransferedByToBatchCode(batchCode: string) {
        return this.http.get<StudentBatchTransfer[]>(environment.apiAcademicsUrl + '/StudentBatchTransfer/GetStudentBatchTransferToBeTransferedByToBatchCode/' + batchCode);
    }

    getByRegistrationNumber(registrationNumber: string) {
        return this.http.get<StudentBatchTransferByRegistration[]>(environment.apiAcademicsUrl + '/StudentBatchTransfer/GetByRegistrationNumber/' + registrationNumber);
    }
   
    insertBatchToBatchTransfer(studentBatchTransfer: StudentBatchTransfer[]) {
        return this.http.post<StudentBatchTransfer[]>(environment.apiAcademicsUrl + '/StudentBatchTransfer/InsertBatchToBatchTransfer', studentBatchTransfer)
    }

    studentBatchTransferByRegistration(registrationNumber: string) {
        return this.http.get<StudentBatchTransfer[]>(environment.apiAcademicsUrl + '/StudentBatchTransfer/GetByRegistrationNumber/' + registrationNumber);
    }
}