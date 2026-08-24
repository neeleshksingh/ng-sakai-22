import { AuditModel } from "../commons/audit-model";

export class InvigilatorAssignment extends AuditModel {
    id?: number;
    examinationId?: number;
    examinationName?: string;
    buildingId?: number;
    buildingName?: string;
    roomId?: number;
    roomNumber?: string;
    startDateTime?: Date;
    endDateTime?: Date;
    employeeCode?: string;
    employeeName?: string;
    status?: string;
}