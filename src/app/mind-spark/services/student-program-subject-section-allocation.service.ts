import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentProgramSubjectSectionAllocation } from 'src/app/shared/models/mindspark/student-program-subject-section-allocation ';
import { GenericService } from 'src/app/shared/services/generic.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentProgramSubjectSectionAllocationService extends GenericService<StudentProgramSubjectSectionAllocation, StudentProgramSubjectSectionAllocation> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "StudentProgramSubjectSectionAllocation", environment.apiAcademicsUrl);
  }

  getStudentProgramSubjectSectionAllocation(academicSessionId: number, programId: number, operationalVerticalId: number, section: String) {
    return this.http.get<StudentProgramSubjectSectionAllocation>(environment.apiAcademicsUrl + `/StudentProgramSubjectSectionAllocation/GetByAcademicSession/${academicSessionId}/Program/${programId}/OperationalVertical/${operationalVerticalId}/Section/${section}`);
  }

  getStudentProgramSubjectSectionAllocationByRegistrationNumber(registrationNumber: string) {
    return this.http.get<StudentProgramSubjectSectionAllocation>(environment.apiAcademicsUrl + `/StudentProgramSubjectSectionAllocation/GetByRegistrationNumber/${registrationNumber}`);
  }
}