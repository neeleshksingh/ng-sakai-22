import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExaminationRoomBookletDistribution, ExaminationRoomBookletDistributionResponse } from 'src/app/shared/models/knowledge-stand/examination-room-booklet-distribution';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationRoomBookletDistributionService {

  constructor(private http: HttpClient) { }

  addExaminationRoomBookletDistribution(examinationRoomBookletDistribution: ExaminationRoomBookletDistribution) {
        return this.http.post<ExaminationRoomBookletDistributionResponse>(environment.apiExaminationsUrl + '/ExaminationRoomBookletAssignment/AddExaminationRoomBookletDistribution', examinationRoomBookletDistribution);
    }
    updateExaminationRoomBookletDistribution(examinationRoomBookletDistribution: ExaminationRoomBookletDistribution) {
      return this.http.post<ExaminationRoomBookletDistributionResponse>(environment.apiExaminationsUrl + '/ExaminationRoomBookletAssignment/UpdateExaminationRoomBookletDistribution', examinationRoomBookletDistribution);
  }
    GetExaminationRoomBookletAssignmentByExaminationId(examinationId: number) {
      return this.http.get<ExaminationRoomBookletDistributionResponse[]>(environment.apiExaminationsUrl + '/ExaminationRoomBookletAssignment/GetByExamination/'+examinationId);
  }
}
