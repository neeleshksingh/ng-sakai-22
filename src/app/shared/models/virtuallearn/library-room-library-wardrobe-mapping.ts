import { AuditModel } from "../commons/audit-model";

export class LibraryRoomLibraryWardrobeMapping extends AuditModel {
        id?: number;
        libraryRoomId?: number;
        libraryWardrobeId?: number;
        status?: string;
}

export class LibraryRoomLibraryWardrobeMappingResponse extends LibraryRoomLibraryWardrobeMapping {
        libraryRoomName?: string;
        libraryWardrobeName?: string;
}