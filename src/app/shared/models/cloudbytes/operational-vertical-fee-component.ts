import { AuditModel } from "../commons/audit-model";
import { IdNameExpando } from "../commons/id-name";
import { PagedData } from "../commons/paged-data";
import { FeeMode } from "./fee-mode";

export class OperationalVerticalFeeComponent extends AuditModel {
    id?: number
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    feeComponentId?: number;
    feeComponentName?: string;
    effectiveFrom?: any;
    generalFee?: number;
    obcFee?: number;
    stscFee?: number;
    feeMode?: FeeMode;
    feeModeName?: string;
    status?: string;
    //introduce on 14 feb 2022
    isAdjustmentAllowed?: boolean;
    canStudentAdjust?: boolean;
}
export class FilterOperationalVerticalFeeComponent {
    academicSessionIds?: number[];
    programIds?: number[];
    operationalVerticalIds?: number[];
}
export class OVFeeSearchPagedData extends PagedData<OperationalVerticalFeeComponent> {
}

export class OperationalVerticalFeeComponentSearchResponse {
    operationalVerticalFeeComponentList?: OperationalVerticalFeeComponent[];
    academicSessionExpandoList?: IdNameExpando[];
    programExpandoList?: IdNameExpando[];
    operationalVerticalExpandoList?: IdNameExpando[];
    feeComponentExpandoList?: IdNameExpando[];
}