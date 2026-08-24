import { BaseModel } from "../commons/base-model";

export class ExaminationResultPublish extends BaseModel {

    
    examinationId?: number;
    examinationName?: string;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    
    hoeStatus?:boolean
    hoeStatusUpdatedDate?: string;
    hoeStatusComments?: string;
    
    registrarStatus?: boolean;
    registrarStatusUpdatedDate?: string;
    registrarStatusComments?: string;
    
    vcStatus?: boolean;
    vcStatusUpdatedDate?: string;
    vcStatusComments?: string;
    
    coeStatus?: boolean;
    coeStatusUpdatedDate?: string;
    coeStatusComments?: string;

    resultPublishDate?: any;
    isResultPublishedInternal?: boolean;
    isResultPublishedExternal?: boolean;
    lockHoeStatusOnLoad?: boolean;
    lockRegistrarStatusOnLoad?: boolean;
    lockVCStatusOnLoad?: boolean;
    lockCOEStatusOnLoad?: boolean;
    
}

