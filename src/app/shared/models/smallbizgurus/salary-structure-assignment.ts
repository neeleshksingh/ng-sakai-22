import { AuditModel } from "../commons/audit-model";

export class SalaryStructureAssignment extends AuditModel {
    id?: number;
    employeeCode?: string;
    salaryStructureId?: number;
    status?: string;
}

export class SalaryStructureAssignmentResponse extends SalaryStructureAssignment {
    salaryStructureName?: number;
}