import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/shared/services/generic.service';
import { StudentGroup } from 'src/app/shared/models/bigleads/student-group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentGroupService extends GenericService<StudentGroup, StudentGroup> {
  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, 'StudentGroup', environment.apiLeadsUrl);
  }
}
