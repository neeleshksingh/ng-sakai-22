import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { StudentFamily } from 'src/app/shared/models/bigleads/student-family';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentFamilyService extends GenericService<StudentFamily, StudentFamily> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "StudentFamily", environment.apiLeadsUrl);
    }

    private studentFamilyDetailsSubject = new BehaviorSubject<StudentFamily[]>([]);
    public studentFamilies = this.studentFamilyDetailsSubject.asObservable();

    GetStudentFamilyByStudentId(studentId: string) {
        this.http.get<StudentFamily[]>(environment.apiGlobalUrl + '/StudentFamily/GetByStudentId/' + studentId).subscribe(response => {
            this.studentFamilyDetailsSubject.next(response);
        });
    }

    getStudentFamilyByStudentId(studentId: string) {
        return this.http.get<StudentFamily[]>(environment.apiGlobalUrl + '/StudentFamily/GetByStudentId/' + studentId);
    }
}