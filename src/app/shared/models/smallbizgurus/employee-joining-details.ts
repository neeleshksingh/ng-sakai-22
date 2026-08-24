import { BaseModel } from "../commons/base-model";

export class EmployeeJoiningDetails extends BaseModel {
    employeeId?: number;
    employeeCode?: string;
    employeeName?: string;
    dateOfJoining?: Date;
    departmentGroupId?: number;
    departmentId?: number;
    isPrimaryDepartment?: boolean;
    designationId?: number;
    reportToEmployeeCode?: string;
    employmentType?: string;
    payrollType?: string;
    aidedType?: string;
    employeePhotoUrl?: string;
    isAllowedToConductClass?: boolean;
    isAllowedToConductLab?: boolean;
    hasNoticePeriod?: boolean;
    noticePeriodInDays?: number;
    employeeGradeId?: number;
    salaryStructureId?: number;
    taxRegimeId?: number;
    exitDate?: Date;

    departmentGroupName?: string;
    departmentName?: string;
    designationName?: string;
    employeeGradeName?: string;
    salaryStructureName?: string;
    taxRegimeName?: string;
}