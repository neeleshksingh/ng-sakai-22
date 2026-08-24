import { AcademicSession } from "../cloudbytes/academic-session";
import { OperationalVertical } from "../cloudbytes/operational-vertical";
import { Program } from "../cloudbytes/program";
import { FeeComponentExpando, StudentExpando } from "./student-concession-category-fee-setup-search-response";


export class StudentFeeLedgerReport {
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    studentId?: string;
    registrationNumber?: string;
    studentName?: string;
    feeComponentId?: number;
    feeComponentName?: string;
    componentFee?: number;
    concessionAmountTotal?: number;
    feeAmount?: number;
    paidAmount?: number;
    dueAmount?: number;
    status?: string;
}
export class StudentFeeLedger {
    id?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    opernationalVerticalName?: string;
    studentId?: string;
    feeComponentId?: number;
    feeComponentName?: string;
    feeAmount?: number;
    receiptNumber?: string;
    receiptDate?: Date;
    transactionType?: string;
    paymentMode?: string;
    paymentModeName?: string;
    referenceNumber?: string;
    paidAmount?: number;

    feeComponentGroup?:any;
}
export class StudentFeeLedgerExpando
{
    studentExpando?:StudentExpando;
    studentFeeLedgerList?:StudentFeeLedger[];
    academicSessionExpandoList?:AcademicSession[];    
    programExpandoList?:Program[];
    operationalVerticalExpandoList?:OperationalVertical[];
    feeComponentExpandoList?:FeeComponentExpando[];
    studentFeeLedgerFileUrl?:string;
}