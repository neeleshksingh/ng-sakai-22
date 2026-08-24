
import { IdNameExpando } from "../commons/id-name";
import { FacultyBatchAttendanceMatrix } from "./faculty-batch-attendance-matrix";

export class FacultyBatchAttendanceMatrixExpando {
    facultyBatchAttendanceMatrixList?: FacultyBatchAttendanceMatrix[];
    academicSessionList?: IdNameExpando[];
    programList?: IdNameExpando[];
    operationalVerticalList?: IdNameExpando[];
    subjectPaperCodeList?: IdNameExpando[];
    facultyList?: IdNameExpando[];
}