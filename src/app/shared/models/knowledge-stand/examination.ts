import { IdNameExpando } from "../commons/id-name";


export class Examination {
  examinationTypeId?: number;
  examinationTypeName?: string;
  id?: number;
  name?: string;
  title?: string;
  description?: string;
  // isResultPublished?: boolean;
  // resultPublishDate?: string;
  isScrutinyOpen?: string;
  scrutinyLastDate?: string;
  trSheetReportVersion?: string;
  marksEntryOpenDateTime?: string;
  marksEntryCloseDateTime?: string;
  isMarksEntryAllowed?: boolean;
  categoryId?: number;
  reason?: string;
  status?: string;
  createdBy?: string;
  modifiedBy?: string;
  createdDate?: Date;
  modifiedDate?: Date;
}
export class ExaminationResponse {
  examinationTypeId?: number;
  examinationTypeName?: string;
  id?: number;
  name?: string;
  title?: string;
  description?: string;
  isResultPublished?: boolean;
  resultPublishDate?: Date;
  isScrutinyOpen?: boolean;
  trSheetReportVersion?: string;
  marksEntryOpenDateTime?: Date;
  marksEntryCloseDateTime?: Date;
  isMarksEntryAllowed?: boolean;
  scrutinyLastDate?: Date;
  reason?: string;
  startDate?: Date;
  status?: string;
  createdBy?: string;
  modifiedBy?: string;
  createdDate?: Date;
  modifiedDate?: Date;

  semesterType?: number | string;
}
export class StudentExamination {
  registrationNumber?: string;
  academicSessionId?: number;
  programId?: number;
  operationalVerticalId?: number;
  examinationTypeId?: number;
  examinationId?: number;
}
export class StudentExaminationResponse {
  studentExaminations?: StudentExamination[];
  studentExpandos?: IdNameExpando[];
  academicSessionExpandos?: IdNameExpando[];
  programExpandos?: IdNameExpando[];
  operationalVerticalExpandos?: IdNameExpando[];
  examinationTypeExpandos?: IdNameExpando[];
  examinationExpandos?: IdNameExpando[];
}