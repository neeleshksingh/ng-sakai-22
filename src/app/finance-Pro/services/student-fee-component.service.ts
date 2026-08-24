import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentFeeComponent } from 'src/app/shared/models/finance-Pro/student-fee-component';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentFeeComponentService extends GenericService<StudentFeeComponent, StudentFeeComponent> {
    
    constructor(public override http: HttpClient, messageService: MessageService) {
      super(http, messageService, "StudentFeeComponent",  environment.apiMastersUrl);
    }

    getByQueryParameter(searchText:string, pageIndex:number, sortBy:string, sortDirection:string, pageSize:number){
        return this.http.get<any>(environment.apiMastersUrl + '/StudentFeeComponent/GetByQueryParameters?SearchText=' + searchText + '&PageIndex=' + pageIndex + '&SortBy=' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
    }
    getBySearchRequest(studentFeeComponentBySearch:any){
        return this.http.post<any>(environment.apiMastersUrl + '/StudentFeeComponent/GetByStudentFeeComponentSearchRequest', studentFeeComponentBySearch)
    }
}