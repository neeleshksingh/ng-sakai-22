import { AuditModel } from "../commons/audit-model";

export class LibraryWardrobeRackNumberMapping extends AuditModel {
    id?: number;
    libraryWardrobeId?: number;
    rackNumber?: string;
    status?: string;
}