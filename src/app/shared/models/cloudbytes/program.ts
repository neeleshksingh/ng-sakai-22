import { BaseModel } from "../commons/base-model";
import { IdNameExpando } from "../commons/id-name";

export class Program extends BaseModel {
    degreeId?: number;
    degreeTypeId?: number;
    facultyDepartmentId?: number;
    facultyDepartmentName?: string;
    degreeTypeName?: string;
    programCode?: string;
    startDate?: string;
    degreeName?: string;
    academicSessionId?: number;
}

export class ProgramResponses extends BaseModel {
    academicSessionId?: number;
    degreeTypeId?: number;
    facultyDepartmentId?: number;
    degreeId?: number;
    programCode?: string;
    startDate?: string;
    programDepartmentId?: number;
    programDepartment?: string;
    degreeType?: string;

    degreeName?: string;

}


export class AcademicSessionProgramExpandos {
    academicSessionExpandos?: IdNameExpando[];
    programResponses?: ProgramResponses[];
}