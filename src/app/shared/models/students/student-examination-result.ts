import { StudentSubjectPaperCodeEndExamMarks } from "./student-subject-paper-code-end-exam-marks";
import { StudentSubjectPaperCodeEndExamMarksConsolidated } from "./student-subject-paper-code-end-exam-marks-consolidated";
import { StudentSubjectPaperCodeMidExamMarks } from "./student-subject-paper-code-mid-exam-marks";

export class StudentExaminationResult {
    studentId?: number;
    registrationNumber?: string;
    studentName?: string;
    fathersName?: string;
    mothersName?: string;
    dateOfBirth?: Date;
    rollNumber?: string;
    isHold?: boolean;
    reason?: string;
    studentSubjectPaperCodeMidExamMarks?: StudentSubjectPaperCodeMidExamMarks[];
    studentSubjectPaperCodeEndExamMarks?: StudentSubjectPaperCodeEndExamMarks[];
    studentSubjectPaperCodeEndExamMarksConsolidated?: StudentSubjectPaperCodeEndExamMarksConsolidated;
}