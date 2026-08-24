import { BaseModel } from "../commons/base-model";

export class JobOpening extends BaseModel {
    jobTitle?: string;
    jobDescription?: string;
    departmentId?: number;
    designationId?: number;
    designationName?: string;
    departmentName?: string;
    staffingPlanId?: number;
    staffingPlanName?: string;
    specialityName?: string;
    numberOfPosition?: number;
    minSalary?: number;
    maxSalary?: number;
    isSalaryDisclosed?: boolean;
    startDate?: any;
    endDate?: any;
    locations?: string;
    minExperience?: number;
    maxExperience?: number;
    keySkills?: string;
    qualifications?: string;
    employmentType?: string;
    specialityId?: number;
    location?: string = '';
    salary?: string = '';
    createdTimestamp?: any;
    readMore? : boolean;
}