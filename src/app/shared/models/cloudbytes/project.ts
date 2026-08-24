import { BaseModel } from "../commons/base-model";

export class Project extends BaseModel {
    applicationKey?: string;
    consumerKey?: string;
    secretKey?: string;
    applicationUrl?: string;
    applicationCallbackUrl?: string;
    sandboxApplicationCallbackUrl?: string;
}