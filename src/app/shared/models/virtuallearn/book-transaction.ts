import { AuditModel } from "../commons/audit-model";
import { DateRange } from "../commons/date-range";

export class BookTransaction extends AuditModel {
  id?: number;
  bookId?: number;
  transactionType?: number;
  transactionTypeName?: string;
  libraryMembershipId?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  libraryMembershipCode?: string;
  transactionDate?: Date;
  expectedReturnDate?: Date;
  memberFullName?: string;
  bookName?: string;
  status?: string;
}

export class IssueReturnBookReport {
  transactionTypeIds?: number[];
  dateRangeRequest?: DateRange;
}

export class IssueReturnBookReportResponse {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalCount?: number;
  hasPrevious?: boolean;
  hasNext?: boolean;
  itemsCount?: number;
  matchingRecordCount?: number;
  items?: [];
}