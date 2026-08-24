import { AuditModel } from "../commons/audit-model";

export class LibraryMemberLogStatus extends AuditModel {
    id?: number;
    libraryMembershipCode?: string;
    libraryMembershipName?: string;
    isLoggedIn?: boolean;
    loggedInDateTime?: Date;
    isLoggedOut?: boolean;
    loggedOutDateTime?: Date;
    status?: string;
}