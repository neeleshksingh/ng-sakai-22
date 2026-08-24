import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { FacultySubjectAllocation } from "src/app/shared/models/mindspark/faculty-subject-allocation";
import { GenericGlobalService } from "src/app/shared/services/generic-service-global.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FacultySubjectAllocationService extends GenericGlobalService<FacultySubjectAllocation, FacultySubjectAllocation> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "FacultySubjectAllocation", environment.apiGlobalUrl);
    }

    getFacultySubjectAllocationBySujectPaperCode(subjectPaperCodeId: number) {
        return this.http.get<FacultySubjectAllocation[]>(environment.apiGlobalUrl + '/FacultySubjectAllocation/GetBySubjectPaperCodeId/' + subjectPaperCodeId);
    }
}