import { BaseModel } from "../commons/base-model";

export class EmployeeDocument extends BaseModel {
    employeeId?: number;
    documentUrl?: string;
}