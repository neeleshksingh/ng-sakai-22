import { StudentExaminationResult } from "./student-examination-result";

export class StudentExaminationResultResponse{
    examinationId?: number;
    examinationName?: string;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    proogramName?: string;
    programCode?: number;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    studentExaminationResultList?: StudentExaminationResult[];
}