import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { StudentExcessAmount } from 'src/app/shared/models/finance-Pro/student-excess-amount';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' 
})
export class StudentExcessAmountService extends GenericService<StudentExcessAmount, StudentExcessAmount> {
    constructor(public override http: HttpClient, messageService: MessageService) {
      super(http, messageService, "StudentExcessAmount",  environment.apiAccountsUrl);
    }
    // Get by registration number, returning Observable
    getByRegistrationNumber(registrationNumber: string): Observable<StudentExcessAmount> {
        return this.http.get<StudentExcessAmount>(`${environment.apiAccountsUrl}/StudentExcessAmount/GetByRegistrationNumber/${registrationNumber}`);
    }

    // Get by UserId
    getStudentExcessAmountByUserId(userId: string): Observable<StudentExcessAmount[]> {
        return this.http.get<StudentExcessAmount[]>(`${environment.apiAccountsUrl}/StudentExcessAmount/GetByUserId/${userId}`);
    }
}
