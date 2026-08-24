import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GenericService } from "src/app/shared/services/generic.service";
import { environment } from "src/environments/environment";
import { MessageService } from "primeng/api";
import { PaperTypeAssessmentConfiguration } from "src/app/shared/models/knowledge-stand/paper-type-assessment-configuration";

@Injectable({
    providedIn: 'root'
})
export class ExaminationTypePaperTypeAssessmentTypeAssessmentComponentService extends GenericService<PaperTypeAssessmentConfiguration[],PaperTypeAssessmentConfiguration[] > {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ExaminationTypePaperTypeAssessmentTypeAssessmentComponent", environment.apiExaminationsUrl);
    }
    
    getByExaminationId(examinationId: number) {
        return this.http.get<PaperTypeAssessmentConfiguration[]>(environment.apiExaminationsUrl + "/ExaminationTypePaperTypeAssessmentTypeAssessmentComponent/GetByExaminationId/" + examinationId);
    }
}