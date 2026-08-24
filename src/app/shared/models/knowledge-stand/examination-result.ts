
export class ExaminationResultSearch {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
}
export class ExaminationResultStudentWise {
    examinationTypeId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
    examinationId?: number;
}
export class StudentExaminationResultResponse{
    examinationId?: number;
    examinationTypeId?:number;
    examinationName?: string;
    examinationTypeName?:string;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    programCode?: number;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    studentExaminationResultList?: StudentExaminationResult[];
}
export class StudentExaminationResult {
    studentId?: number;
    registrationNumber?: string;
    studentName?: string;
    fathersName?: string;
    mothersName?: string;
    dateOfBirth?: Date;
    rollNumber?: string;
    isHold: boolean=false;
    reason?: string;
    studentSubjectPaperCodeMidExamMarks?: StudentSubjectPaperCodeMidExamMarks[];
    studentSubjectPaperCodeEndExamMarks?: StudentSubjectPaperCodeEndExamMarks[];
    studentSubjectPaperCodeEndExamMarksConsolidated?: StudentSubjectPaperCodeEndExamMarksConsolidated;
}
export class StudentSubjectPaperCodeMidExamMarks {
    registrationNumber?: string;
    serialNumber?: number;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    subjectId?: number;
    subjectName?: string;
    totalMarks?: number;
    marksObtained?: number;
    marksWeightage?: number;
}
export class StudentSubjectPaperCodeEndExamMarks {
    registrationNumber?: string;
    serialNumber?: number;
    subjectPaperCodeId?:  number;
    subjectPaperCodeName?: string;
    subjectId?:  number;
    subjectName?: string;
    credits?:  number;
    grade?: string;
    gradePoint?:  number;
}
export class StudentSubjectPaperCodeEndExamMarksConsolidated {
    registrationNumber?: string;
    totalCredits?: number;
    totalGradePoints?:  number;
    sgpa? : number;
    cgpa? :  number;
    commulativeCredits?: number;
    commulativeEGP? :  number;
}