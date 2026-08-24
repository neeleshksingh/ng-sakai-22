
import { Book } from "./book";
import { BookLocation } from "./book-location";
import { BookTransaction } from "./book-transaction";

export class BookDetail {
    book?: Book;
    lastBookTransaction?: BookTransaction;
    bookLocation?: BookLocation;
}