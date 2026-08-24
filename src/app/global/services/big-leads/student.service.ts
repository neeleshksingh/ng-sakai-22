import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/shared/models/bigleads/student';
import { StudentImage } from 'src/app/shared/models/knowledge-stand/student-image';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  private studentDetailsSubject = new BehaviorSubject<Student | null>(null);
  public studentId!: string;

  getByStudentId(studentId: string) {
     this.http.get<Student>(environment.apiGlobalUrl + '/Student/GetByStudentId/' + studentId).subscribe(response => {
      this.studentDetailsSubject.next(response);
     });
  }

  get student(){
    return this.studentDetailsSubject.asObservable();
  }
  GetAllStudent() {
    return this.http.get<any[]>(environment.apiLeadsUrl + '/Student/GetAll');
}

  uploadStudentImage(academicSession: number, program: number, operationalVertical: number, formFile: FormData) {
    return this.http.post<any>(environment.apiLeadsUrl + '/Student/UploadStudentImage/AcademicSession/' + academicSession + '/Program/' + program + '/OperationalVertical/' + operationalVertical, formFile);
  }

  getStudentImage(academicSession: number, program: number, operationalVertical: number) {
    return this.http.get<StudentImage[]>(environment.apiGlobalUrl + '/Student/GetStudentImage/AcademicSession/' + academicSession + '/Program/' + program + '/OperationalVertical/' + operationalVertical);
  }

  GetByStudentId(studentId: string) {
    return this.http.get<Student>(environment.apiGlobalUrl + '/Student/GetByStudentId/' + studentId);
  }

  GetStudentMasterSheetData() {
    return this.http.get<any[]>(environment.apiGlobalUrl + '/Student/GetStudentMasterSheetData');
}

}
