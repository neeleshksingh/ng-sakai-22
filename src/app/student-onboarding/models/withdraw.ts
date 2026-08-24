export class Withdraw {
    id?: number;
    provisionalNumber?: string;
    bankName?: string;
    branchName?: string;
    accountNumber?: string;
    ifscCode?: string;
    accountHolderName?: string;
    fileUrl?: string;
    withdrawalReason?: string;
    totalRefund?: number;
    refundDate?: Date;
    holdReason?: string;
    holdBy?: string;
    holdDate?: Date;
    withdrawalStatus?: string;
    createdBy?: string;
    createdDate?: Date;
    modifiedBy?: string;
    modifiedDate?: Date;
}