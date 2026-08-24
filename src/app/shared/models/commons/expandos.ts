export class StudentExpando {
    studentId?: string;
    registrationNumber?: string;
    studentName?: string;
}
export class AcademicSessionExpando {
    id?: number;
    name?: string;
}
export class ProgramExpando {
    academicSessionId?: number;
    id?: number;
    name?: string;
}
export class OperationalVerticalExpando {
    id?: number;
    name?: string;
} export class ExaminationTypeExpando {
    id?: number;
    name?: string;
} export class ExaminationExpando {
    id?: number;
    name?: string;
}
export class SubjectPaperCodeExpando {
    id?: number;
    name?: string;
}


export class AcademicSession {
    id?: number;
    name?: string;
}
export class Program {
    academicSessionId?: number;
    id?: number;
    name?: string;
}
export class OperationalVertical {
    id?: number;
    name?: string;
}
export class SubjectPaperCode{
    id?: number;
    name?: string;
}

export class DegreeTypeExpandos {
    id?: number;
    name?: string;
}

export class PaperTypeExpandos {
    id?: number;
    name?: string;
}