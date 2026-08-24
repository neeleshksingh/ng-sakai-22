import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { StudentProgramChangeRequest, StudentProgramChangeRequestResponse } from "src/app/shared/models/mindspark/student-program-change-request";
import { GenericService } from "src/app/shared/services/generic.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class StudentProgramChangeRequestService extends GenericService<StudentProgramChangeRequest, StudentProgramChangeRequestResponse> {
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "StudentProgramChangeRequest", environment.apiAcademicsUrl);
    }

    getByRegistrationNumber(registrationNumber: string) {
        return this.http.get<StudentProgramChangeRequestResponse[]>(environment.apiAcademicsUrl + '/StudentProgramChangeRequest/GetByRegistrationNumber/' + registrationNumber);
    }

    getByStudentId(studentId: string) {
        return this.http.get<StudentProgramChangeRequestResponse[]>(environment.apiAcademicsUrl + '/StudentProgramChangeRequest/GetByStudentId/' + studentId);
    }

    getByAcademicSessionProgramOperationalVertical(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<StudentProgramChangeRequestResponse[]>(environment.apiAcademicsUrl + `/StudentProgramChangeRequest/GetByAcademicSessionId/${academicSessionId}/ProgramId/${programId}/OperationalVerticalId/${operationalVerticalId}`);
    }

    review(payload: StudentProgramChangeRequest) {
        return this.http.post<StudentProgramChangeRequestResponse>(environment.apiAcademicsUrl + '/StudentProgramChangeRequest/UpdateReviewStatus', payload);
    }

    approve(payload: StudentProgramChangeRequest) {
        return this.http.post<StudentProgramChangeRequestResponse>(environment.apiAcademicsUrl + '/StudentProgramChangeRequest/UpdateApproveStatus', payload);
    }

    updateStudentProgram(payload: StudentProgramChangeRequest) {
        return this.http.post<StudentProgramChangeRequestResponse>(environment.apiAcademicsUrl + '/StudentProgramChangeRequest/UpdateStudentProgramStatus', payload);
    }

    updateFeeMaster(payload: StudentProgramChangeRequest) {
        return this.http.post<StudentProgramChangeRequestResponse>(environment.apiAcademicsUrl + '/StudentProgramChangeRequest/UpdateFeeMasterStatus', payload);
    }

    cancelFeeReceipt(payload: StudentProgramChangeRequest) {
        return this.http.post<StudentProgramChangeRequestResponse>(environment.apiAcademicsUrl + '/StudentProgramChangeRequest/UpdateFeeReceiptCancelledStatus', payload);
    }

    reissueFeeReceipt(payload: StudentProgramChangeRequest) {
        return this.http.post<StudentProgramChangeRequestResponse>(environment.apiAcademicsUrl + '/StudentProgramChangeRequest/UpdateFeeReceiptReissuedStatus', payload);
    }
}