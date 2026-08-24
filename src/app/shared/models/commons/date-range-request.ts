export class DateRangeRequest {
    fromDateTime?: Date;
    toDateTime?: Date;
    pageIndex: number = 1;
    sortBy: string = "Name";
    sortDirection: string = "ASC";
    pageSize: number = 100;
}
