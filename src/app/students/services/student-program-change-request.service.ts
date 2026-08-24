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
        super(http, messageService, "StudentProgramChangeRequest", environment.apiStudentsUrl);
    }

    getByRegistrationNumber(registrationNumber: string) {
        return this.http.get<StudentProgramChangeRequestResponse[]>(environment.apiStudentsUrl + '/StudentProgramChangeRequest/GetByRegistrationNumber/' + registrationNumber)
    }

    getByStudentId(studentId: string) {
        return this.http.get<StudentProgramChangeRequestResponse[]>(environment.apiStudentsUrl + '/StudentProgramChangeRequest/GetByStudentId/' + studentId)
    }
}