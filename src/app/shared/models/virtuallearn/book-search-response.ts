import { Book } from './book';

export class BookSearchResponse {
    books: Book[]=[];
    searchCategories?: SearchCategoryResponse[]
}
export class SearchCategoryResponse {
    searchCategoryName?: string
    searchCategoryItems?: SearchCategoryItem[];
}
export class SearchCategoryItem {
    searchCategoryItemName?: string;
}

export class SearchCriteria {
    term?: string;
    criteria: Criteria[]=[];
}
export class Criteria {
    key?: string;
    value?: string;
}