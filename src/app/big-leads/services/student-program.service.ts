import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AcademicSessionProgramExpandos } from 'src/app/shared/models/cloudbytes/program';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class StudentProgramService extends GenericService<StudentProgram,StudentProgram> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "StudentRegister", environment.apiLeadsUrl);
  }

    getStudentByStudentId(studentId: string) {
        return this.http.get<any>(environment.apiAcademicsUrl + '/StudentProgram/GetByStudentId/' + studentId);
    }
    updateStudentByStudentId(studentPrograms: StudentProgram[]) {
      return this.http.post<StudentProgram[]>(environment.apiAcademicsUrl + '/StudentProgram/UpdateById/', studentPrograms);
    }
    getProgramSpecialization(){
      return this.http.get<any>(environment.apiGlobalUrl+'/ProgramSpecialization/GetAll')
    }
    getAcademicSessionProgramListByAcademicSessionIdProgramId(academicSessionId: string, programId: string) {
      return this.http.get<AcademicSessionProgramExpandos[]>(environment.apiGlobalUrl + '/AcademicSessionProgram/GetByAcademicSession/' + academicSessionId + '/Program/' + programId );
    }
}
