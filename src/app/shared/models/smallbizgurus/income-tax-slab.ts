import { BaseModel } from "../commons/base-model";

export class IncomeTaxSlab extends BaseModel{
    startRange?: number;
    endRange?: number;
}