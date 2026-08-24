import { AcademicSession } from "../cloudbytes/academic-session";
import { OperationalVertical } from "../cloudbytes/operational-vertical";
import { Program } from "../cloudbytes/program";


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
export class ExaminationExpando{
    id?: number;
    name?: string;
}
export class StudentSubjectPaperCodeEndExamMarks {
      registrationNumber?: string;
      serialNumber?: number;
      subjectPaperCodeId?: number;
      subjectPaperCodeName?: string;
      subjectId?: string;
      subjectName?: string;
      credits?: string;
      grade?: string;
      gradePoint?: string;
}
export class StudentSubjectPaperCodeEndExamMarksConsolidated {
      registrationNumber?: string;
      sgpa?: string;
      cgpa?: string;
      totalCredits?: string;
      totalGradePos?: string;
      commulativeCredits?: string;
      commulativeEGP?: string;
}
export class StudentMidExaminations{
      programId?: number;
      operationalVerticalId?: number;
      registrationNumber?: string;
      examinationId?: number;
      examinationName?: string;
      startDate?: string;
      isHold?: boolean;
      studentSubjectPaperCodeMidExamMarks?: StudentSubjectPaperCodeMidExamMarks[];
}
export class StudentEndExaminations{
      programId?: number;
      operationalVerticalId?: number;
      registrationNumber?: string;
      examinationId?: number;
      examinationName?: string;
      startDate?: string;
      isHold?: boolean;
      studentSubjectPaperCodeEndExamMarksConsolidated?: StudentSubjectPaperCodeEndExamMarksConsolidated[];
}
export class StudentExaminationResultOperationalVerticals {
      programId?: number;
      programName?: string;
      operationalVerticalId?: number;
      operationalVerticalName?: string;
      registrationNumber?: string;
      studentMidExaminations?: StudentMidExaminations[];
      studentSubjectPaperCodeEndExamMarks?: StudentSubjectPaperCodeEndExamMarks[];
      studentEndExaminations?: StudentEndExaminations[];
}
export class StudentExaminationResultPrograms {
      academicSessionId?: number;
      academicSessionName?:string;
      programId?: number;
      programName?:string;
      registrationNumber?: string;
      rollNumber?: string;
      registrationNumberProgramCode?: string;
      studentExaminationResultOperationalVerticals?: StudentExaminationResultOperationalVerticals[];
}
export class StudentFullExaminationResultResponse {
      studentId?: string;
      studentName?: string;
      fathersName?: string;
      mothersName?: string;
      dateOfBirth?: string;
      studentExaminationResultPrograms?: StudentExaminationResultPrograms[];
      academicSessionExpandoList?: AcademicSession[];
      programExpandoList?: Program[];
      operationalVerticalExpandoList?: OperationalVertical[];
      examinationExpandoList?:ExaminationExpando[];
     // studentExaminationResultOperationalVerticals?: StudentExaminationResultOperationalVerticals[];
}