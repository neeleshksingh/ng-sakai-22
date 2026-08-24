import { BaseModel } from "../commons/base-model";

export class EmployeeEducationalHistory extends BaseModel {
    employeeId?: number;
    degreeName?: string;
    schoolCollegeName?: string;
    boardUniversityName?: string;
    passingYear?: number;
    speciality?: string;
    subjects?: string;
    totalMarks?: string;
    obtainedMarks?: string;
    grade?: string;
}