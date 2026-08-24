export class StudentSemesterRegistrationStatus {
    id?: number;
    AcademicSessionId ?:number;
    AcademicSessionName?: string;
    ProgramId?: number;
    ProgramName?: string;
    OperationalVerticalId?: number;
    OperationalVerticalName?: string;
    StudentName?: string;
    OutstandingAmount?: number;
    IsSemesterRegistrationCompleted?: boolean;
    LastSemesterRegistrationDate?:Date;
    IsExaminationRegistrationCompleted?:boolean;
    LastExaminationRegistrationDate?:Date;
}
