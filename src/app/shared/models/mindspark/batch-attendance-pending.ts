
export class BatchAttendancePending {
    id?: string;
    batchScheduleId?: number;
    batchCode?: string;
    section?:string;
    primaryFacultyCode?: string;
    primaryFacultyName?: string;
    primaryFacultyPhoneNumber?: string;
    secondaryFacultyCode?: string;
    secondaryFacultyName?: string;
    subjectId?: number;
    subjectName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    moduleName?: string;
    subModuleName?: string;
    scheduleDate?: string;
    version?: string;
    cycle?: string;
    startTime?: Date;
    endTime?: Date;
    subjectPaperCodeModuleName?: string;
    subjectPaperCodeModuleSubModuleName?: string;
    originalScheduleDate?: Date;
}