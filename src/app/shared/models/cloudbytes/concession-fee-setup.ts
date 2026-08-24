import { AuditModel } from "../commons/audit-model";
import { IdNameExpando } from "../commons/id-name";

export class ConcessionFeeSetup extends AuditModel {
    id?: number;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    concessionCategoryId?: number;
    concessionCategoryName?: string;
    feeComponentId?: number;
    feeComponentName?: string;
    concessionUnit?: string;
    concessionValue?: number;
    status?: string;
    description?: string;
}
export class ConcessionFeeSetupSearchPagedData {
    currentPage?: number;
    totalPages?: number;
    pageSize?: number;
    totalCount?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
    itemsCount?: number;
    items?: ConcessionFeeSetup[];
}
export class ConcessionFeeSetupSearchResponse {
    concessionFeeSetupList?: ConcessionFeeSetup[];
    academicSessionExpandoList?: IdNameExpando[];
    programExpandoList?: IdNameExpando[];
    operationalVerticalExpandoList?: IdNameExpando[];
    concessionCategoryExpandoList?: IdNameExpando[];
    feeComponentExpandoList?: IdNameExpando[];
}