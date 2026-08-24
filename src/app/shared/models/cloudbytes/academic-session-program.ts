import { AuditModel } from "../commons/audit-model";

export class AcademicSessionProgram extends AuditModel {
    id?: number;
    degreeTypeId?: number;
    degreeTypeName?: string;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    operationalVerticalType?: string;
    startDate?: string;
    endDate?: string;
    cordinatorEmployeeCode?: string;
    hodEmployeeCode?: string;
    deanEmployeeCode?: string;
    status?: string;

    semesterId?: number;
    semesterName?: string;
}