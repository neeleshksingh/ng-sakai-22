import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { StudentConcessionCategoryFeeSetupPagedData, StudentConcessionCategoryFeeSetupSearchResponse } from 'src/app/shared/models/finance-Pro/student-concession-category-fee-setup-search-response';
import { StudentConcessionCategoryFeeSetup } from 'src/app/shared/models/finance-Pro/student-concession-category-fee-setup';
import { AcademicProgramOVSearch } from 'src/app/shared/models/mindspark/academic-program-ov';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentConcessionCategoryFeeSetupService extends GenericService<StudentConcessionCategoryFeeSetup, StudentConcessionCategoryFeeSetup> {
  constructor(public override http: HttpClient, messageService: MessageService) {
    super(http, messageService, "StudentConcessionCategoryFeeSetup", environment.apiAccountsUrl);
  }

  getStudentConcessionFeeSetupByUserId(userId: string): Observable<StudentConcessionCategoryFeeSetup[]> {
    return this.http.get<StudentConcessionCategoryFeeSetup[]>(`${environment.apiAccountsUrl}/StudentConcessionCategoryFeeSetup/GetByUserId/${userId}`);
  }

  GetStudentConcessionCategoryFeeSetupExpandoByStudentConcessionCategoryFeeSetupSearchRequest(academicProgramOVSearch: AcademicProgramOVSearch): Observable<StudentConcessionCategoryFeeSetupSearchResponse> {
    return this.http.post<StudentConcessionCategoryFeeSetupSearchResponse>(
      `${environment.apiAccountsUrl}/StudentConcessionCategoryFeeSetup/GetStudentConcessionCategoryFeeSetupExpandoByStudentConcessionCategoryFeeSetupSearchRequest`,
      academicProgramOVSearch
    );
  }

  getStudentConcessionFeeSetupByQuery(searchText: string, pageIndex: number, sortBy: string, sortDirection: string, pageSize: number): Observable<StudentConcessionCategoryFeeSetupPagedData> {
    return this.http.get<StudentConcessionCategoryFeeSetupPagedData>(
      `${environment.apiAccountsUrl}/StudentConcessionCategoryFeeSetup/GetByQueryParameters?PageIndex=${pageIndex}&SortBy=${sortBy}&SortDirection=${sortDirection}&PageSize=${pageSize}`
    );
  }
}
