import { IdNameExpando } from "../commons/id-name";
import { PagedData } from "../commons/paged-data";
import { OperationalVerticalSubjectConfiguration } from "./operational-vertical-subject-configuration";

export class SessionProgramOvSearchResponse {
    operationalVerticalSubjectConfigurations?: OperationalVerticalSubjectConfiguration[];
    academicSessionExpandos?: IdNameExpando[];
    programExpandos?: IdNameExpando[];
    operationalVerticalExpandos?: IdNameExpando[];
    subjectTypeExpandos?: IdNameExpando[];
}
export class SessionProgramOvSearchPagedData extends PagedData<OperationalVerticalSubjectConfiguration> {

}