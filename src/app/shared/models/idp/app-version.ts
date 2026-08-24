import { BaseModel } from "../commons/base-model";

export class AppVersion extends BaseModel
  {
    version?: string;
    releaseNotes?: string;
    isLatest?: boolean;
  }