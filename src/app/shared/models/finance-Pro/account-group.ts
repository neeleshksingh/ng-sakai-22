import { BaseModel } from "../commons/base-model";

export class AccountGroup extends BaseModel {
    accountCategoryId?: number;
    accountHeadId?: number;
}

export class AccountGroupResponse extends AccountGroup {
    accountCategoryName?: string;
    accountHeadName?: string;
}