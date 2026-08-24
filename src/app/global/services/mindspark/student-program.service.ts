import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StudentProgram, StudentProgramList, StudentProgramResponse } from 'src/app/shared/models/mindspark/student-program';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentProgramService {
  private studentProgramSubject = new BehaviorSubject<StudentProgram[]>([]);
  public studentId?: string;

  constructor(private http: HttpClient) {}

  getStudentProgramByStudentId(studentId: string): void {
    this.http
      .get<StudentProgram[]>(`${environment.apiGlobalUrl}/StudentProgram/GetByStudentId/${studentId}`)
      .subscribe((response: StudentProgram[]) => {
        this.studentProgramSubject.next([...response]);
      });
  }

  get studentProgram(): Observable<StudentProgram[]> {
    return this.studentProgramSubject.asObservable();
  }

  getByStudentId(studentId: string): Observable<StudentProgram[]> {
    return this.http.get<StudentProgram[]>(`${environment.apiGlobalUrl}/StudentProgram/GetByStudentId/${studentId}`);
  }

  getByRegistrationNumber(registrationNumber: string): Observable<StudentProgramList> {
    return this.http.get<StudentProgramList>(`${environment.apiGlobalUrl}/StudentProgram/GetByRegistrationNumber/${registrationNumber}`);
  }

  getStudentProgramByRegistrationNumber(registrationNumber: number): Observable<StudentProgramResponse> {
    return this.http.get<StudentProgramResponse>(`${environment.apiGlobalUrl}/StudentProgram/GetByRegistrationNumber/${registrationNumber}`);
  }

  studentProgramByRegistrationNumber(registrationNumber: string) {
    return this.http.get<StudentProgramList>(`${environment.apiGlobalUrl}/StudentProgram/GetByRegistrationNumber/${registrationNumber}`);
  }

  getPromotionDataByAcademicSessionProgramOperationalVertical(
    academicSessionId: number,
    programId: number,
    operationalVerticalId: number
  ): Observable<StudentProgramResponse[]> {
    return this.http.get<StudentProgramResponse[]>(
      `${environment.apiGlobalUrl}/StudentProgram/GetPromotionDataByAcademicSession/${academicSessionId}/Program/${programId}/OperationalVertical/${operationalVerticalId}`
    );
  }

  updateStudentProgramPromotionData(studentPrograms: StudentProgram[]): Observable<StudentProgramResponse[]> {
    return this.http.post<StudentProgramResponse[]>(`${environment.apiGlobalUrl}/StudentProgram/UpdateStudentProgramPromotionData`, studentPrograms);
  }

  updateStudentFacility(studentProgram: StudentProgram[]): Observable<StudentProgram[]> {
    return this.http.post<StudentProgram[]>(`${environment.apiGlobalUrl}/StudentProgram/UpdateStudentFacility`, studentProgram);
  }

  getByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number): Observable<StudentProgram[]> {
    return this.http.get<StudentProgram[]>(`${environment.apiGlobalUrl}/StudentProgram/GetByAcademicSession/${academicSessionId}/Program/${programId}/OperationalVertical/${operationalVerticalId}`);
  }
}
