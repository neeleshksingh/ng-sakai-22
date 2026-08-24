import { BaseModel } from "../commons/base-model";

export class HolidayResponse extends BaseModel {
    date?: Date;
    type?: string;
    nameLocal?: string;
    state?: string;
}
export class HolidayRequest extends BaseModel {
    date?: Date;
    type?: string;
    nameLocal?: string;
    state?: string;
}