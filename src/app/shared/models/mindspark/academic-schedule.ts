import { AuditModel } from "../commons/audit-model";

export class AcademicSchedule extends AuditModel {
    id?: number;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    section?: string;
    dayId?: number;
    dayName?: string;
    timeTablePeriodId?: number;
    timeTablePeriodName?: string;
    subjectId?: number;
    subjectName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    roomNumber?: string;
    status?: string;
}