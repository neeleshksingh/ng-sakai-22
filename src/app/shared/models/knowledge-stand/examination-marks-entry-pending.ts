import { BaseModel } from "../commons/base-model";

export class ExaminationMarksEntryPendingReport extends BaseModel {
    AcademicSessionId?: number;
    ProgramId?: number;
    OperationalVerticalId?: number;
    ExaminationId?: number;
    AcademicSessionName?: string;
    ProgramName?: string;
    Semester?: string;
    FacultyName?: string;
    EmployeeName?: string;
    FacultyCode?: string;
    Subject?: string;
    SubjectPapercodeId?: number;
    SubjectPapercode?: string;
    SubjectId?: number;
    SubjectCode?: string;
    EmployeeId?: number;
    EmployeeCode?: string;
    FirstName?: string;
}