import { AuditModel } from "../commons/audit-model";

export class SalaryStructureSalaryComponentMapping extends AuditModel {
    id?: number;
    salaryStructureId?: number;
    salaryStructureName?: string;
    salaryComponentId?: number;
    salaryComponentName?: string;
    componentType?: string;
    formula?: string;
    abbreviation?: string;
    description?: string;
    periodicity?: number;
    amount?: number;
    status?: string;

    isFirstRow?: boolean;
    groupIds?: number[];
    rowspan?: number;
}