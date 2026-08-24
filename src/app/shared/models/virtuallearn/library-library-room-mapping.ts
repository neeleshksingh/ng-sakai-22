import { AuditModel } from "../commons/audit-model";

export class LibraryLibraryRoomMapping extends AuditModel {
    id?: number;
    libraryId?: number;
    libraryName?: string;
    libraryRoomName?: string;
    libraryRoomId?: number;
    status?: string
}