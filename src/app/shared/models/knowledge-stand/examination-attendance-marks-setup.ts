import { AuditModel } from "../commons/audit-model";


export class ExaminationAttendanceMarksSetup extends AuditModel {
    id?: number;
    examinationId?: number;
    averageAttendanceFrom?: number;
    averageAttendanceTo?: number;
    marks?: number;
    status?: string
}