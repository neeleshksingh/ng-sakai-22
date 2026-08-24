import { AcademicSession } from "../cloudbytes/academic-session";
import { FeeComponent } from "../cloudbytes/fee-component";
import { OperationalVertical } from "../cloudbytes/operational-vertical";
import { Program } from "../cloudbytes/program";
import { AuditModel } from "../commons/audit-model";
import { Student } from "../mindspark/student";
import { PaymentChallanFeeComponent } from "./payment-challan-fee-components";

export class PaymentChallan extends AuditModel{
    id?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
    studentName?: string;
    challanDate?: Date;
    challanNumber?: string;
    challanAmount?: number;
    paymentMode?: number;
    paymentDate?: Date;
    ddChequeNumber?: string;
    issueBank?: string;
    transactionId?: string;
    grossTotalAmount?: number;
    netTotalAmount?: number;
    excessAmount?: number;
    cashAmount?: number;
    ddAmount?: number;
    amount?: number;
    status?: string;
    rowSelected?: boolean;
    rowFieldsDisabled?: boolean;
    confirmButtonDisabled?: boolean;
    remarks?:string
}
export class PaymentChallanDateRangeRequest {
    academicSessionExpandos?: AcademicSession[];
    feeComponentExpandos?: FeeComponent[];
    operationalVerticalExpandos?: OperationalVertical[];
    paymentChallanFeeComponents?: PaymentChallanFeeComponent[];
    paymentChallans?: PaymentChallan[];
    programExpandos?: Program[];
    studentExpandos?: Student[];
}