import { BaseModel } from "../commons/base-model";

export class AccountSubGroup extends BaseModel {
    accountCategoryId?: number;
    accountHeadId?: number;
    accountGroupId?: number;
}

export class AccountSubGroupResponse extends AccountSubGroup {
    accountCategoryName?: string;
    accountHeadName?: string;
    accountGroupName?: string;
}