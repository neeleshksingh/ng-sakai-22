import { IdNameExpando } from "../commons/id-name";
import { StudentExamination } from "./student-examination";

export class StudentExaminationResponse{
    studentExaminations?: StudentExamination[];
    studentExpandos?: IdNameExpando[];
    academicSessionExpandos?:IdNameExpando[];
    programExpandos?: IdNameExpando[];
    operationalVerticalExpandos?: IdNameExpando[];
    examinationTypeExpandos?: IdNameExpando[];
    examinationExpandos?: IdNameExpando[];
}