import { BaseModel } from "../commons/base-model";
export class ExaminationAttendance extends BaseModel {
    studentProgramPaperCodeAllocationId?:number;
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    paperTypeId?: number;
    subjectPaperCodeId?: number;
    batchCode?: string;
    registrationNumber?: string;
    bookletNumber?: string;
    decodeNumber?: number;
    isPresent?: boolean;
    attendanceMarkedBy?: string;
    attendanceUpdatedDate?: string;
    examinationTypeName?: string;
    examinationName?: string;
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    subjectId?: number;
    subjectName?: string;
    paperTypeName?: string;
    subjectPaperCodeName?: string;
    studentName?: string;
    facultyCode?: string;
    facultyName?: string;
    attendanceStatus?: string;
    isPresentStr?:string;
    subjectTypeId?:number;

}
