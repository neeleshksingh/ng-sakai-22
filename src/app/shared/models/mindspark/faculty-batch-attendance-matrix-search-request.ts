import { AcademicSession } from "../cloudbytes/academic-session";
import { OperationalVertical } from "../cloudbytes/operational-vertical";
import { Program } from "../cloudbytes/program";

export class FacultyBatchAttendanceMatrixSearchRequest {
    academicSessionIds ?: AcademicSession[];
    programIds?: Program[];
    operationalVerticalIds?: OperationalVertical[];
}