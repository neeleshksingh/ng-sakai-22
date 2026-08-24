import { Role } from "./Role";

export class LoggedInUser {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  displayName?: string;
  displayImageUrl?: string;
  dob?: string
  createdDate?: string;
  modifiedDate?: string;
  roles?: Role[];
  id?: string;
  userName?: string;
  normalizedUserName?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed?: boolean;
  phoneNumber?: number;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnabled?: boolean;
  isMinority?: boolean;
  isPhysicallyHandicaped?: boolean;
  maritalStatus?: string;
  pan?: string;
  voterId?: string;
  aadharNumber?: string;

  motherTongue?: string;
  religionName?: string;
  categoryName?: string;
  casteName?: string;
  alternateEmail?: string;
  alternatePhoneNumber?: string;
  bloodGroup?: string;
  gender?: string;
}