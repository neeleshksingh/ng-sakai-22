import { AuditModel } from "../commons/audit-model";

export class StudentFeeMaster extends AuditModel {
    id?: number;
    studentId?: string;
    registrationNumber?: string;
    studentName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    feeComponentId?: number;
    feeComponentName?: string;
    academicSessionId?: number;
    academicSessionName?: string;
    effectiveFrom?: string;
    componentFee?: number;
    concessionUnit?: string;
    concessionValue?: number;
    concessionAmount?: number;
    concessionAmountTotal?: number;
    feeAmount?: number;
    feeMode?: string;
    dueDate?: string;
    paidAmount?: number;
    dueAmount?: number;
    payableAmount?: number;
    adjustAmount?: number;
    payableAmountDisable?: boolean = false;
    isMarkedAsInvalid?: boolean;
    status?: string
    isAccountsCanAdjust?: boolean = false;
    isAdjustmentAllowed?: boolean;
    canStudentAdjust?: boolean;
    studentComponentFeeId?: number;
    remarks?:string;
  }