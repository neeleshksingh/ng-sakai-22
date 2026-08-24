import { AcademicSession } from "../cloudbytes/academic-session";
import { OperationalVertical } from "../cloudbytes/operational-vertical";
import { Program } from "../cloudbytes/program";
import { FeeComponentExpando } from "./fee-component-expando";
import { StudentComponentFeeUpdate } from "./student-component-fee";
import { StudentExpando } from "./student-concession-category-fee-setup-search-response";
import { StudentFeeMaster } from "./student-fee-master";


export class StudentComponentFeeExpando {
    studentComponentFeeList?: StudentComponentFeeUpdate[];
    studentFeeMasterList?: StudentFeeMaster[];
    academicSessionExpandoList?: AcademicSession[];
    programExpandoList?: Program[];
    operationalVerticalExpandoList?: OperationalVertical[];
    feeComponentExpandoList?: FeeComponentExpando[];
    studentExpandoList?:StudentExpando[];
}