import { BaseModel } from "../commons/base-model";

export class StudentStatus extends BaseModel {
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    studentName?: string;
    studentId?: string;
    registrationNumber?: string;
    studentStatusDescriptionId?: number;
    studentStatusDescriptionName?: string;
    statusDescription?: string;
    startDate?: string;;
    endDate?: string;;
    isRestore?: Boolean;
    restoreDate?: string;
    restoreDescription?: string;
    restoreBy?: string;
}