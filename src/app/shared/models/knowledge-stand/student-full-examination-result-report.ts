import { IdNameExpando } from "../commons/id-name";

export class StudentSubjectPaperCodeMidExamMarks {
      examinationTypeId?: number;
      examinationId?: number;
      operationalVerticalId?: number;
      registrationNumber?: string;
      serialNumber?: number;
      subjectPaperCodeId?: number;
      subjectPaperCodeName?: string;
      subjectId?: string;
      subjectName?: string;
      totalMarks?: string;
      marksObtained?: string;
      marksWeightage?: string;
}
export class StudentSubjectPaperCodeEndExamMarks {
      registrationNumber?: string;
      serialNumber?: number;
      subjectPaperCodeId?: number;
      subjectPaperCodeName?: string;
      subjectId?: string;
      subjectName?: string;
      credits?: string;
      obtainedMarks?: any;
      grace?: string;
      grade?: string;
      gradePoint?: string;
      isSubmittedForScrutiny?: boolean;
}
export class StudentSubjectPaperCodeEndExamMarksConsolidated {
      registrationNumber?: string;
      sgpa?: string;
      cgpa?: string;
      totalCredits?: string;
      totalGradePoints?: string;
      commulativeCredits?: string;
      commulativeEGP?: string;
}
export class StudentMidExaminations {
      programId?: number;
      operationalVerticalId?: number;
      registrationNumber?: string;
      examinationId?: number;
      examinationName?: string;
      startDate?: string;
      isHold?: boolean;
      studentSubjectPaperCodeMidExamMarks?: StudentSubjectPaperCodeMidExamMarks[];
}
export class StudentEndExaminations {
      programId?: number;
      operationalVerticalId?: number;
      registrationNumber?: string;
      examinationId?: number;
      examinationName?: string;
      startDate?: string;
      isHold?: boolean;
      studentSubjectPaperCodeEndExamMarks: StudentSubjectPaperCodeEndExamMarks[]=[]
      studentSubjectPaperCodeEndExamMarksConsolidated?: StudentSubjectPaperCodeEndExamMarksConsolidated;
}

export class StudentExaminationResultOperationalVerticalFinalPointAverages {
    operationalVerticalId?: number;
    sgpa?: number;
    cgpa?:number
}
export class StudentExaminationResultOperationalVerticals {
      programId?: number;
      programName?: string;
      operationalVerticalId?: number;
      operationalVerticalName?: string;
      registrationNumber?: string;
      studentMidExaminations : StudentMidExaminations[] = [];
      studentSubjectPaperCodeEndExamMarks?: StudentSubjectPaperCodeEndExamMarks[];
      studentEndExaminations: StudentEndExaminations[] = [];
      studentExaminationResultOperationalVerticalFinalPointAverages?: StudentExaminationResultOperationalVerticalFinalPointAverages[] =[];
}
export class StudentExaminationResultPrograms {
      academicSessionId?: number;
      academicSessionName?: string;
      programId?: number;
      programName?: string;
      registrationNumber?: string;
      rollNumber?: string;
      registrationNumberProgramCode?: string;
      studentExaminationResultOperationalVerticals: StudentExaminationResultOperationalVerticals[] = [];
}
export class StudentFullExaminationResultResponse {
      studentId?: string;
      studentName?: string;
      fathersName?: string;
      mothersName?: string;
      dateOfBirth?: string;
      studentExaminationResultPrograms: StudentExaminationResultPrograms[] = [];
      academicSessionExpandoList: IdNameExpando[] = [];
      programExpandoList: IdNameExpando[] = [];
      operationalVerticalExpandoList: IdNameExpando[] = [];
      examinationExpandoList: IdNameExpando[] = [];
}