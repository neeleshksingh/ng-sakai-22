export class BatchAttendance {
  studentId?: string;
  registrationNumber?: string;
  programId?: number;
  programName?: string;
  operationalVerticalId?: number;
  operationalVerticalName?: string;
  operationalVerticalType?: string;
  subjectPaperCodeId?: number;
  subjectPaperCodeName?: string;
  subjectId?: number;
  date?: string;
  batchCode?: string;
  totalScheduled?: number;
  totalClassConducted?: number;
  totalPresent?: number;
  totalAbsent?: number;
  attendancePercentage?: number;
  subjectName?: string;
  operationalVertical?: OperationalVertical;
  cycle?: string;
  isPresent?: boolean;
  section?: string
}
export class OperationalVertical {
  id?: number;
  name?: string
}