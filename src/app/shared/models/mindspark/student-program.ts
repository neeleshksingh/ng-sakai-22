import { AuditModel } from "../commons/audit-model";
import { Student } from "./student";

export class StudentProgram extends AuditModel {
  id?: number;
  academicSessionProgramId?: number;
  academicSessionId?: number;
  academicSessionName?: string;
  studentId?: string;
  studentName?: string;
  registrationNumber?: string;
  programId?: number;
  programName?: string;
  operationalVerticalId?: number;
  operationalVerticalName?: string;
  targetOperationalVerticalId?: number;
  targetOperationalVerticalName?: string;
  startDate?: Date;
  endDate?: Date;
  isMasterFeeGenerated?: boolean;
  isValid?: boolean;
  isCurrentOperationalVertical?: boolean;
  isHostelOptIn?: boolean;
  isBusOptIn?: boolean;
  isSemesterRegistrationCompleted?: boolean;
  isSemesterCompleted?: boolean;
  hostelStartDate?: Date;
  hostelEndDate?: Date;
  busStartDate?: Date;
  busEndDate?: Date;
  programSpecializationId?: number;
  rollNumber?: string;
  isExaminationRegistrationCompleted?: boolean;
  abcId?: string;
  section?: string;
  subSection?: string;
  status?: string;
  isDisabled?: boolean = false;
  isBusDisable?: boolean;
  isHostelDisable?: boolean;
  cgpa?: number;
  sgpa?: number;
  attendanceCount?: number;
  backlogCount?: number;
  phoneNumber?: string;
  email?: string;

  isRollNumberFromApi?: boolean;
  isRollNumberEditable?: boolean;
}
export class StudentProgramResponse {
  studentPrograms?: StudentProgram[];
}

export class StudentProgramList {
  student?: Student;
  studentPrograms?: StudentProgram[];
}