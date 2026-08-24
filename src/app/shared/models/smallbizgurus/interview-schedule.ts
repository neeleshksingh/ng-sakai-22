import { AuditModel } from "../commons/audit-model";
import { BaseModel } from "../commons/base-model";

export class InterviewSchedule extends BaseModel {
  jobApplicationId?: number;
  interviewType?: string;
  interviewDate?: Date;
  startTime?: string;
  endTime?: string;
  interviewerEmployeeCode?: string;
  level?: string;
  levelDescription?: string;
  resumeLink?: string;
  interviewerEmployees?: InterviewerEmployees[];
  isCalendarViewEnabled?: Boolean;
}

export class InterviewerEmployees extends AuditModel {
  id?: number;
  employeeCode?: string;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  emailId?: string;
  phoneNumber?: string;
  gender?: string;
  religionId?: number;
  castId?: number;
  maritalStatus?: string;
  isSpecialAbled?: boolean;
  bloodGroup?: string;
  nationality?: string;
  employeePhotoUrl?: string;
  status?: string;
}