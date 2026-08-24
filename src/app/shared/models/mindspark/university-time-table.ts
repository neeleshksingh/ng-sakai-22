export class UniversityTimeTable {
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    section?: string;
    days?: DayTimeTable[];
}

export class DayTimeTable {
    dayId?: number;
    dayName?: string;
    periods?: PeriodTimeTable[];
}

export class PeriodTimeTable {
    timeTablePeriodId?: number;
    periodName?: string;
    periodTime?: string
    subjectId?: number;
    subjectName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    employeeCode?: string;
    employeeName?: string;
    roomNumber?: string;
    breakType?: string;
}