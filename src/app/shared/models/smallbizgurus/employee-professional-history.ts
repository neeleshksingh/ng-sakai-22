import { BaseModel } from "../commons/base-model";

export class EmployeeProfessionalHistory extends BaseModel {
    employeeId?: number;
    isCurrentEmployment?: Boolean;
    employmentType?: string;
    organizationName?: string;
    designation?: string;
    joiningDate?: string;
    lastWorkingDate?: string;
    jobProfile?: string;
    lastCTC?: string;
    skillsUsed?: string;
    noticePeriodInDays?: number;
}