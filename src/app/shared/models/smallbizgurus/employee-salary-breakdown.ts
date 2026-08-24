import { AuditModel } from "../commons/audit-model";
import { BaseModel } from "../commons/base-model";

export class EmployeeSalaryBreakDown {
    salaryStructureId?: number;
    partnerResponse?: PartnerResponse;
    partnerImage?: PartnerImage;
    employeeSalaryBasicDetail?: EmployeeSalaryBasicDetail;
    employeeSalaryWorkDetail?: EmployeeSalaryWorkDetail;
    employeeSalaryAccountDetail?: EmployeeSalaryAccountDetail;
    salaryStructureSalaryComponentMappingResponseList?: SalaryStructureSalaryComponentMappingResponseList[];
    employeeSalaryBreakDownSummary?: EmployeeSalaryBreakDownSummary;
}

export class SalaryStructureSalaryComponentMappingResponseList extends AuditModel {
    salaryComponentName?: string;
    amount?: number;
    formulaFormatted?: string;
    id?: number;
    salaryStructureId?: number;
    salaryComponentId?: number;
    componentType?: string;
    abbreviation?: string;
    formula?: string;
    description?: string;
    periodicity?: number;
    status?: string;
}

export class PartnerResponse extends BaseModel {
    shortName?: string;
    shortDescription?: string;
    displayName?: string;
    partnerCode?: string;
    startDate?: Date;
    endDate?: Date;
    primaryEmail?: string;
    secondaryEmail?: string;
    primaryPhoneNumber?: number;
    secondaryPhoneNumber?: number;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    pinCode?: number;
    bankAccountNumber?: number;
    establishedDescription?: string;
    actYear?: number;
    notificationNumber?: string;
    notificationDate?: Date;
    ugcLetterNumber?: string;
    ugcLetterDate?: Date;
}

export class PartnerImage extends BaseModel {
    partnerCode?: string;
    partnerImageType?: string;
    imagePath?: string;
}

export class EmployeeSalaryBasicDetail {
    employeeCode?: string;
    employeeName?: string;
    designation?: string;
    department?: string;
    dateOfJoining?: Date;
    dateOfBirth?: Date;
    location?: string;
}

export class EmployeeSalaryWorkDetail {
    arrearLOP?: number;
    arrearDays?: number;
    payDays?: number;
    lop?: number;
    encashmentDays?: number;
}

export class EmployeeSalaryAccountDetail {
    pan?: string;
    bankName?: string;
    bankAccountNumber?: string;
    ifscCode?: string;
    pfAccountNumber?: string;
    uan?: string;
    esiNumber?: string;
}

export class EmployeeSalaryBreakDownSummary {
    grossSalary?: number;
    totalDeduction?: number;
    netSalary?: number;
    netSalaryInWords?: string;
    monthlyCTC?: number;
    annualSalary?: number;
    annualSalaryInWords?: string;
}