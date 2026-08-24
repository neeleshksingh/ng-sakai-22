import { BaseModel } from "../commons/base-model";

export class Book extends BaseModel {
    accessionDate?: Date;
    accessionNumber?: string;
    oldAccessionNumber?: string;
    serviceCode?: string;
    classNumber?: string;
    author?: string;
    edition?: string;
    volume?: string;
    publisher?: string;
    city?: string;
    publishedYear?: number;
    pages?: number;
    prePages?: number;
    sub?: string;
    subjectName?: string;
    bookCategoryId?: number;
    librarySectionId?: number;
    price?: number;
    // price?: number;
    bookType?: string;
    transactionType?: number
    transactionTypeName?: string;
    transactionDate?: Date;
    expectedReturnDate?: Date;
    libraryName?: string;
    libraryRoomName?: string;
    libraryWardrobeName?: string;
    rackNumber?: string;
    bookCategoryName?: string;
    librarySectionName?: string;
}