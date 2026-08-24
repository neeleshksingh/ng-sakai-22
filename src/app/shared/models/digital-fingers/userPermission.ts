import { BaseModel } from "../commons/base-model"

export class UserPermission extends BaseModel {
  userId?: string;
  permissionId?: number;
  hasPermission?: boolean;
}