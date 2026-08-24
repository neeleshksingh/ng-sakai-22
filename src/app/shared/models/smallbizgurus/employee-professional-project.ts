import { BaseModel } from "../commons/base-model";

export class EmployeeProfessionalProject extends BaseModel {
    employeeId?: number;
    employeeEducationId?: number;
    employeeProfessionalId?: number;
    clientName?: string;
    projectStatus?: string;
    startDate?: string;
    endDate?: string;
    teamSize?: number;
    projectLocation?: string;
    projectSite?: string;
    natureOfEmployment?: string;
    role?: string;
    roleDescription?: string;
    skillsUsed?: string;
}