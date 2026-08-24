import { Student } from "src/app/shared/models/bigleads/student";
import { FeeComponent } from "src/app/shared/models/cloudbytes/fee-component";
import { OperationalVertical } from "src/app/shared/models/cloudbytes/operational-vertical";
import { IdNameExpando } from "src/app/shared/models/commons/id-name";
import { FeeReceipt, FeeReceiptDetails } from "src/app/shared/models/finance-Pro/fee-receipt";
import { StudentFeeMaster } from "src/app/shared/models/finance-Pro/student-fee-master";

export class ProvisionalFeeReceiptResponse {
    feeComponents?: FeeComponent[];
    feeReceiptDetails?: FeeReceiptDetails[];
    feeReceipts?: FeeReceipt[];
    operationalVerticals?: OperationalVertical[];
    programs?: IdNameExpando[];
    studentFeeMasters?: StudentFeeMaster[];
    students?: Student[]=[];
}