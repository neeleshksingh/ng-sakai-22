import { IdNameExpando } from "../commons/id-name";
import { TrStudentConsolidatedResponse } from "./tr-student-consolidated";

export class StudentConsolidatedMarksStatement {
    examinationExpandoes ?: IdNameExpando[];
    academicSessionExpandoes ?: IdNameExpando[];
    programExpandoes ?: IdNameExpando[];
    operationalVerticalExpandoes ?: IdNameExpando[];
    studentExpandoes ?: IdNameExpando[];
    trStudentConsolidatedResponseList ?: TrStudentConsolidatedResponse[];
}