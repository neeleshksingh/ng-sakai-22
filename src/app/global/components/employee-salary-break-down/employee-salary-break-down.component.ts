import { Component, Input } from '@angular/core';
import { SharedModule } from '@/shared.module';
import { EmployeeSalaryAccountDetail, EmployeeSalaryBasicDetail, EmployeeSalaryBreakDownSummary, EmployeeSalaryWorkDetail, PartnerImage, PartnerResponse } from 'src/app/shared/models/smallbizgurus/employee-salary-breakdown';

@Component({
  selector: 'app-employee-salary-break-down',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './employee-salary-break-down.component.html',
  styleUrl: './employee-salary-break-down.component.scss'
})
export class EmployeeSalaryBreakDownComponent {
  @Input() monthYear: string = this.getCurrentMonthYear();
  @Input() earnings: { salaryComponentName: string; amount: number }[] = [];
  @Input() deductions: { salaryComponentName: string; amount: number }[] = [];

  @Input() partnerResponse: PartnerResponse = {};
  @Input() partnerImage: PartnerImage = {};
  @Input() employeeSalaryBasicDetail: EmployeeSalaryBasicDetail = {};
  @Input() employeeSalaryWorkDetail: EmployeeSalaryWorkDetail = {};
  @Input() employeeSalaryAccountDetail: EmployeeSalaryAccountDetail = {};
  @Input() employeeSalaryBreakDownSummary: EmployeeSalaryBreakDownSummary = {};

  constructor() { }

  private getCurrentMonthYear(): string {
    const currentDate = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  }
}