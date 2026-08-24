import { BaseModel } from "../commons/base-model";

export class StudentExaminationByAcadmicSession extends BaseModel{
    examinationTypeName?: string;
    examinationTypeId?: number;
    isResultPublished?: boolean;
    resultPublishDate?: Date;
    isScrutinyOpen?: boolean;
    scrutinyLastDate?: Date;
    startDate?: Date;
    categoryId?: number;
}