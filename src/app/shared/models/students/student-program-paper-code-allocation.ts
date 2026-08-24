import { AuditModel } from "../commons/audit-model";
import { OperationalVerticalSubject } from "./operational-vertical-subject";

export class StudentProgramPaperCodeAllocation extends AuditModel {
    id?: number;
    studentId?: string;
    registrationNumber?: string;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    subjectTypeId?: number;
    subjectPaperCodeId?: number;
    batchCode?: string;
    status?: string
}
export class StudentProgramPaperCodeAllocationResponse {
    operationalVerticalSubjectResponseDataList?: OperationalVerticalSubject[];
    operationalVerticalSubjects?:OperationalVerticalSubject[]
}