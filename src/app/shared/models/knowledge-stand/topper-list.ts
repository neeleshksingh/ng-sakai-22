export class TopperStudent {
    studentId?: number;
    registrationNumber?: number;
    studentName?: string;
    sgpa?: number;
    cgpa?: number;
    totalMarksObtained?: number;
    percentage? : number;
    rank?: number;
}
export class StudentExaminationTopper{
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    topRank?: number;
    topperStudents?: TopperStudent[]; 
}
export class TopperStudentRequest {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    topRank?: number;
}
