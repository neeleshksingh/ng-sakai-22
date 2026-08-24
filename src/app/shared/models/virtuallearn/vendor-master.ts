import { BaseModel } from "../commons/base-model";

export class VendorMaster extends BaseModel {
  address?: string;
  phoneNumber?: string;
  emailId?: string;
  pan?: string;
  gstin?: string;
  stateCode?: string
}