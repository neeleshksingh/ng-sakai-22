export interface FacultyAvailabilityReport {
    date: Date | string; // Added for grouping
    employeeCode: string;
    facultyName: string;
    department: string;
    isPresent: boolean;
    isOnLeave: boolean;
    substituteFaculty: string;
}