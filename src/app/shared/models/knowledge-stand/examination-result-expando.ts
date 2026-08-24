import { IdNameExpando } from "../commons/id-name";
export class ExaminationResultExpandoResponse {
    studentId?: string;
    studentName?: string;
    fathersName?: string;
    mothersName?: string;
    dateOfBirth?: string;
    academicSessionExpandoList: IdNameExpando[] = [];
    programExpandoList: IdNameExpando[] = [];
    operationalVerticalExpandoList: IdNameExpando[] = [];
    examinationExpandoList: IdNameExpando[] = [];
    studentExaminationResultPrograms: StudentExaminationResultProgram[] = [];
}
export class StudentExaminationResultProgram {
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    registrationNumber?: string;
    registrationNumberProgramCode?: string;
    rollNumber?: string;
    studentExaminationResultOperationalVerticals: StudentExaminationResultOperationalVertical[] = [];
}
export class StudentExaminationResultOperationalVertical {
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    registrationNumber?: string;
    studentMidExaminations: StudentMidExamination[] = [];
    studentEndExaminations: StudentEndExaminations[] = [];
    midSemester: Examination[]=[];
    endSemesterExams: Examination[]=[];
    examinationResults: Examination[]=[];
    examinationData: ExaminationData[]=[];
    studentExaminationResultOperationalVerticalFinalPointAverages?: StudentExaminationResultOperationalVerticalFinalPointAverages[]=[];
}
export class StudentMidExamination {
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    registrationNumber?: string;
    examinationId?: number;
    examinationName?: string;
    startDate?: string;
    resultPublishDate?:string;
    isHold?: boolean;
    studentSubjectPaperCodeMidExamMarks: StudentSubjectPaperCodeMidExamMark[] = [];
}
export class StudentSubjectPaperCodeMidExamMark {
    examinationTypeId?: number;
    examinationTypeName?: string;
    examinationId?: number;
    examinationName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    registrationNumber?: string;
    serialNumber?: number;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    subjectId?: number;
    subjectName?: string;
    totalMarks?: number;
    obtainedMarks?: number;
    marksWeightage?: string;
}
export class StudentEndExaminations {
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    registrationNumber?: string;
    examinationId?: number;
    examinationName?: string;
    startDate?: string;
    resultPublishDate?:string;
    isHold?: boolean;
    studentSubjectPaperCodeEndExamMarks: StudentSubjectPaperCodeEndExamMark[] = [];
    studentSubjectPaperCodeEndExamMarksConsolidated?: StudentSubjectPaperCodeEndExamMarksConsolidated;
}

export class StudentExaminationResultOperationalVerticalFinalPointAverages {
    operationalVerticalId?: number;
    sgpa?: number;
    cgpa?:number
}
export class StudentSubjectPaperCodeEndExamMark {
    examinationTypeId?: number;
    examinationTypeName?: string;
    examinationId?: number;
    examinationName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    registrationNumber?: string;
    serialNumber?: number;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    subjectId?: number;
    subjectName?: string;
    credits?: number;
    grade?: string;
    obtainedMarks ? : number;
    gradePoint?: number;
    isSubmittedForScrutiny?: boolean;
    grace?: number;
}
export class StudentSubjectPaperCodeEndExamMarksConsolidated {
    examinationTypeId?: number;
    examinationTypeName?: string;
    examinationId?: number;
    examinationName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    registrationNumber?: string;
    sgpa?: number;
    cgpa?: number;
    totalCredits?: number;
    totalGradePoints?: number;
    commulativeCredits?: number;
    commulativeEGP?: number;
}
export class Examination {
    examinationId?: number;
    examinationName?: string;
    startDate?: string;
    resultPublishDate?:string;
    records: Record[]=[];
}
export type Record =
    | MidExamRecord
    | EndExamRecord;
export class MidExamRecord {
    paperCode?: string;
    subjectName?: string;
    totalMarks?: number;
    obtainedMarks?: number;
    marksWeightage?: number;
}
export class EndExamRecord {
    subjectName?: string;
    paperCode?: string;
    credits?: number;
    grade?: string;
    gradePoint?: number;
    obtainedMarks ? : number;
    isSubmittedForScrutiny?: boolean;
    grace?: number;
}
export class ExaminationData {
    paperCode!: string;
    subjectName!: string;
    totalMarks!: number;
    obtainedMarks!: number;
    marksWeightage!: number;
    endSemesterData: EndSemesterData[] = [];
    midSemesterData?: StudentMidExamination;
  }
  export class EndSemesterData {
    credits?: number;
    grade?: string;
    gradePoint?: number;
    examinationId?: number;
    startDate?: string;
    resultPublishDate?:string;
  }