import { BaseModel } from "../commons/base-model";

export class FeedbackQuestion extends BaseModel {
    displayOrder?: number;
    type?: string;
    optionLabels?: string;
    optionValues?: string;
}