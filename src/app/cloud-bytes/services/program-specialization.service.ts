import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgramSpecialization } from 'src/app/shared/models/cloudbytes/program-specialization';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProgramSpecializationService extends GenericService<ProgramSpecialization, ProgramSpecialization> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "ProgramSpecialization", environment.apiMastersUrl);
  }
}