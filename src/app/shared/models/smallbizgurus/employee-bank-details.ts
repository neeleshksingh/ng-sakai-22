import { BaseModel } from "../commons/base-model";

export class EmployeeBankDetails extends BaseModel {
    employeeId?: number;
    accountType?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    branchName?: string;
    city?: string;
    isPrimaryAccount?: boolean;
}