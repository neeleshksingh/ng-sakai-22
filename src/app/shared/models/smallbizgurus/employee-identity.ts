import { BaseModel } from "../commons/base-model";

export class EmployeeIdentity extends BaseModel {
    employeeId?: number;
    identityTypeId?: number;
    identityNumber?: string;
    validFrom?: string;
    validTo?: string;
    issuer?: string;
    issueDate?: string;
}