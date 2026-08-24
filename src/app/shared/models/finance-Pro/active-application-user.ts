import { AuditModel } from "../commons/audit-model";
export class ActiveApplicationUser extends AuditModel {
    userName?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    profilePictureUrl?: string;
    sessionName?: string;
    programName?: string;
    departmentName?: string;
    lastAccessDate?: string;


    // public string? UserId { get; set; }
    //  public string? UserName { get; set; }
    //  public string? FirstName { get; set; }
    //  public string? LastName { get; set; }
    //  public string? Email { get; set; }
    //  public string? PhoneNumber { get; set; }
    //  public string? ProfilePictureUrl { get; set; }
    //  public DateTime? CreatedDate { get; set; }
    //  public string? SessionName { get; set; }
    //  public string? ProgramName { get; set; }
    //  public string? DepartmentName { get; set; }
    //  public DateTime? LastAccessDate { get; set; } //Student - MigrationIssueDate, Employee- ExitDate
}