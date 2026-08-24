import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WithdrawalService } from 'src/app/global/services/student-admission-withdrawal/withdrawal.service';
import { SharedModule } from '@/shared.module';
import { StudentProgramProvisional } from 'src/app/shared/models/finance-Pro/student-program-provisional';
import { Withdraw } from 'src/app/shared/models/student-onboarding/withdraw';
import { StudentRegisterService } from 'src/app/student-onboarding/services/bigleads/student-register.service';
import { StudentAdmissionWithdrawalPaymentProcessComponent } from '../student-admission-withdrawal-payment-process/student-admission-withdrawal-payment-process.component';

@Component({
  selector: 'app-student-admission-withdrawal-view',
  standalone: true,
  imports: [SharedModule, StudentAdmissionWithdrawalPaymentProcessComponent],
  templateUrl: './student-admission-withdrawal-view.component.html',
  styleUrl: './student-admission-withdrawal-view.component.scss'
})
export class StudentAdmissionWithdrawalViewComponent implements OnInit {
  @Input() canEditTo?: boolean;
  @Input() currentModuleNameTo?: string;
  studentOnBoardingWithdrawalDetials: Withdraw = {};
  studentProgramProvisional: StudentProgramProvisional = {};
  studentRegistrationId!: number;
  componentName: string = 'Student Admission Withdrawal Details';
  iconClass!: string;

  constructor(private withdrawalService: WithdrawalService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private studentRegisterService: StudentRegisterService,
  ) { }

  ngOnInit(): void {
    if (this.currentModuleNameTo == 'mindspark') {
      this.iconClass = 'fas fa-brain'
    } else if (this.currentModuleNameTo == 'finpro') {
      this.iconClass = 'fas fa-indian-rupee-sign'
    }
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.withdrawalService.getStudentOnBoardingWithdrawalById(id).subscribe({
          next: (response) => {
            this.studentOnBoardingWithdrawalDetials = response;
            if (this.studentOnBoardingWithdrawalDetials?.phoneNumber) {
              this.getStudentRegisterByPhoneNumber(this.studentOnBoardingWithdrawalDetials?.phoneNumber);
            }
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error ', detail: error.message, life: 3000 });
          }
        });
      }
    });
  }
  getStudentRegisterByPhoneNumber(studentPhoneNumber: string) {
    this.studentRegisterService.getStudentRegisterByPhoneNumber(studentPhoneNumber).subscribe({
      next: (response) => {
        this.studentProgramProvisional = response;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error ', detail: error.message, life: 3000 });
      }
    })
  }
  goBack() {
    this.router.navigate(['/home', this.currentModuleNameTo, 'transactions', 'student-admission-withdrawal']);
  }
}
