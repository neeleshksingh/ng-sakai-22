import { BaseModel } from "../commons/base-model";

export class JobOffer extends BaseModel {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  offeredDate?: Date;
  specificDetails?: string;
  offerDocumentLink?: string;
  jobApplicationId?: number;
  offeredDateTime?: Date;
  reportingDateTime?: Date;
  totalCTC?: number;
  salaryStructureId?: number;
  isJobOfferAccepted?: Boolean;
  jobAcceptanceDetail?: string;
  joiningFullAddress?: string;
  staffingPlanId?: number;
}

export class DateRange {
  fromDateTime?: Date;
  toDateTime?: Date;
  pageIndex?: number;
  sortBy?: string;
  sortDirection?: string;
  pageSize?: number;
}