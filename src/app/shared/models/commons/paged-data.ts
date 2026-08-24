export class PagedData<T> {
    currentPage?: number;
    totalPages?: number;
    pageSize?: number;
    totalRecordCount?: number;
    matchingRecordCount?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
    itemsCount?: number;
    totalCount?: number;
    items?: T[];
}