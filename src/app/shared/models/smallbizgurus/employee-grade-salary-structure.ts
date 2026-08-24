import { BaseModel } from "../commons/base-model";

export class EmployeeGradeSalaryStructure extends BaseModel {
    employeeGradeId?: number;
    salaryStructureId?: number;
}

export class EmployeeGradeSalaryStructureResponse extends EmployeeGradeSalaryStructure {
    employeeGradeName?: string;
    salaryStructureName?: string;
}