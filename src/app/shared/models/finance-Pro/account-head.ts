import { BaseModel } from "../commons/base-model";

export class AccountHead extends BaseModel {
    accountCategoryId?: number;
    code?: string;
    accountType?: string;
}

export class AccountHeadResponse extends AccountHead {
    accountCategoryName?: string;
}