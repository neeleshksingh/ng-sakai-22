import { BaseModel } from "../commons/base-model";

export class FinancialYear extends BaseModel {
    startDate?: Date;
    endDate?: Date;
    isCurrent?: boolean;
    isClosed?: boolean;
    closingDate?: Date;
    closedBy?: string;
}