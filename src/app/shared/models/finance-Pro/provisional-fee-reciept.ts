import { Student } from "../bigleads/student";
import { FeeComponent } from "../cloudbytes/fee-component";
import { OperationalVertical } from "../cloudbytes/operational-vertical";
import { ProgramExpando } from "../commons/expandos";
import { FeeReceipt, FeeReceiptDetails } from "./fee-receipt";
import { StudentFeeMaster } from "./student-fee-master";


export class ProvisionalFeeReceiptResponse {
    feeComponents?: FeeComponent[];
    feeReceiptDetails?: FeeReceiptDetails[];
    feeReceipts?: FeeReceipt[];
    operationalVerticals?: OperationalVertical[];
    programs?: ProgramExpando[];
    studentFeeMasters?: StudentFeeMaster[];
    students?: Student[];
}