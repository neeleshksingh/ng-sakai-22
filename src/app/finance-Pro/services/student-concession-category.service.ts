import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentConcessionCategory } from 'src/app/shared/models/finance-Pro/student-concession-category';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' 
})
export class StudentConcessionCategoryService extends GenericService<StudentConcessionCategory, StudentConcessionCategory> {
  constructor(public override http: HttpClient,  messageService: MessageService) {
    super(http,messageService, "StudentConcessionCategory",  environment.apiAccountsUrl);
  }
}