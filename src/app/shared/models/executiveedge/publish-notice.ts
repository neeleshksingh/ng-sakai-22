import { BaseModel } from "../commons/base-model";


export class PublishNotice extends BaseModel{
    noticeType?: string[];
    refNumber?: number;
    source?: string;
    noticeDate?: string;
    attachmentUrl?: string;
    isApproved?: boolean;
    approvedBy?: string;
    approvedDate?: string;
}