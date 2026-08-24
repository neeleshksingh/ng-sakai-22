import { BaseModel } from "../commons/base-model";

export class Degree extends BaseModel {
    degreeTypeId?: number;
    degreeTypeName?: string;
    facultyDepartmentId?: number;
    facultyDepartmentName?: string;
}