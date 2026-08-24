import { AuditModel } from "../commons/audit-model";

export class BookLocation extends AuditModel{
    id?: number;
    libraryId?: number;
    libraryRoomId?: number;
    libraryWardrobeId?: number;
    rackNumber?: string;
    bookId?: number;

    libraryName?: string;
    libraryRoomName?: string;
    libraryWardrobeName?: string;
    bookName?: string;
    status?: string;
}