import { BaseModel } from "../commons/base-model";

export class DocumentCenter extends BaseModel {
    category?: string;
    documentUrl?: string;
  departmentsToShareWith?: any;
}

export class DocumentCenterCategory {
    category?: string;
    items?: DocumentCenter[];
}