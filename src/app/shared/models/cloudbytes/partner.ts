import { BaseModel } from "../commons/base-model";

export class Partner extends BaseModel {
    shortName?: string;
    shortDescription?: string;
    displayName?: string;
    partnerCode?: string;
    startDate?: Date;
    endDate?: Date;
    primaryEmail?: string;
    secondaryEmail?: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    pinCode?: string;
    bankAccountNumber?: string;
    establishedDescription?: string;
    actYear?: string;
    notificationNumber?: string;
    notificationDate?: Date;
    ugcLetterNumber?: string;
    ugcLetterDate?: Date
}

export class PartnerImage extends BaseModel {
    partnerCode?: string;
    partnerImageType?: string;
    effectiveFromDateTime?: Date;
	effectiveToDateTime?: Date;
    imagePath?: string;
}

export class PartnerUploadImage {
    partnerImageId?: number;
    partnerImageType?: string;
}

export class PartnerImageType extends BaseModel {

}