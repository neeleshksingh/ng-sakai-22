import { BaseModel } from "../commons/base-model";

export class StudentExaminationByAcadmicSession1  extends BaseModel {
    examinationTypeName?: string;
    examinationTypeId?: number;
    isResultPublished?: boolean;
    resultPublishDate?: Date;
    isScrutinyOpen?: false;
    scrutinyLastDate?: Date;
    startDate?: Date;
}