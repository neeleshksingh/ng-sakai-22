import { BaseModel } from "../commons/base-model";

export class DocumentCenter extends BaseModel{
    category?: string;
    documentUrl?: string;
}

export class DocumentCenterCategory {
    category?: string;
    items?: DocumentCenter[];
}