export class Withdraw {
    id?: number;
    studentRegistrationId?: number;
    provisionalNumber?: string;
    bankName?: string;
    branchName?: string;
    accountNumber?: string;
    ifscCode?: string;
    accountHolderName?: string;
    fileUrl?: string;
    withdrawalReason?: string;
    semesterFee?: number;
    paidAmount?: number;
    dueAmount?: number;
    totalRefund?: number;
    refundDate?: Date;
    holdReason?: string;
    holdBy?: string;
    holdDate?: Date;
    refundDescription?: string;
    phoneNumber?: string;
    withdrawalStatus?: string;
    createdBy?: string;
    createdDate?: Date;
    modifiedBy?: string;
    modifiedDate?: Date;
}

export class WithdrawResponse extends Withdraw {
    studentName?: string;
    programName?: string;
    academicSessionName?: string;
}