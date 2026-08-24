import { OperationalVertical } from "../cloudbytes/operational-vertical";
import { PaperType } from "../cloudbytes/paper-type";
import { Program } from "../cloudbytes/program";
import { Subject } from "../cloudbytes/subject";
import { SubjectPaperCode } from "../cloudbytes/subject-paper-code";
import { SubjectType } from "../cloudbytes/subject-type";
import { ProgramOperationalVerticalSubjectPaperCode } from "./program-operational-vertical-subject-paper-code";

export class ProgramOvsSubjectsPaperCodes
{
    programs?:Program[];
    operationalVerticals?:OperationalVertical[];
    subjects?:Subject[];
    subjectTypes?:SubjectType[];
    paperTypes?:PaperType[];
    subjectPaperCodes?:SubjectPaperCode[];
    programOperationalVerticalSubjectPaperCodes?:ProgramOperationalVerticalSubjectPaperCode[];
}