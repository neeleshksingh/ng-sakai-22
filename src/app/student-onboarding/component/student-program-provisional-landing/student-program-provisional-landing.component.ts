import { TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import saveAs from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BehaviorSubject } from 'rxjs';
import { WelcomeLetterComponent } from "src/app/global/components/welcome-letter/welcome-letter.component";
import { OperationalVerticalSubjectService } from 'src/app/global/services/cloudbytes/operational-vertical-subject.service';
import { SharedModule } from '@/shared.module';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { RazorPayCheckOutRequest } from 'src/app/shared/models/students/razor-pay-check-out-request';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { LocalstorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { PaymentChallanOnboarding } from '../../models/payment-challan-onboarding';
import { StudentProgramProvisional } from '../../models/student-program-provisional';
import { StudentProvisionalFee } from '../../models/student-provisional-fee';
import { StudentRegisterService } from '../../services/bigleads/student-register.service';
import { StudentProgramProvisionalService } from '../../services/student-program-provisional.service';
import { WithdrawService } from '../../services/withdraw/withdraw.service';
import { PaymentSuccessComponent } from '../payment-success/payment-success.component';

@Component({
  selector: 'app-student-program-provisional-landing',
  standalone: true,
  imports: [SharedModule, PaymentSuccessComponent, TitleCasePipe, WelcomeLetterComponent],
  providers: [
    TitleCasePipe,
    ConfirmationService,
    MessageService,
    LocalstorageService,
    DateFormatterService,
    StudentRegisterService,
    OperationalVerticalSubjectService,
    StudentProgramProvisionalService,
  ],
  templateUrl: './student-program-provisional-landing.component.html',
  styleUrl: './student-program-provisional-landing.component.scss'
})
export class StudentProgramProvisionalLandingComponent {
  paymentFormGroup!: FormGroup;
  activeTabIndex: number = 0;
  studentName: string = '';
  courseStructure: CourseStructure[] = [];
  totalCredits: number = 0;
  selectedSemesterSubjects: { name: string, credit: number }[] = [];
  totalYears: number = 0;
  studentProgramProvisional!: StudentProgramProvisional;
  studentProvisionalFee: StudentProvisionalFee[] = [];
  razorPayCheckOutRequest: RazorPayCheckOutRequest = {};
  partnerCode: string = '';
  isMakePaymentBtnVisible: boolean = true;
  isContinuePaymentBtnVisible: boolean = false;
  currentUserSubject!: BehaviorSubject<LoginResponse>;
  provisionalNumber: string = '';
  studentEmail: string = '';
  studentPhonenumber: string = '';
  paymentResponseId: string = '';
  studentInfoPairs: {
    label1: string,
    value1: string,
    label2: string,
    value2: string,
    needsTitleCase1?: boolean,
    needsTitleCase2?: boolean
  }[] = [];
  receiptNumber: string = '';
  provisionalStudentId: string = '';
  password: string = '';
  username: string = '';
  referenceNumber: string = '';
  isLoading: boolean = false;
  isButtonLoading: boolean = false;

  withdrawalFormGroup!: FormGroup;
  withdrawalStatus: string = '';
  isFileError: boolean = false;
  fileError: string = '';
  formData = new FormData();
  fileName: string = '';
  isWithdrawalDisabled: boolean = false;
  totalRefund!: number;
  withdrawalStatusList: WithdrawalStatus[] = [];
  withdrawalRequestConfirmationBox: boolean = false;
  isCancelRequest: boolean = false;
  currentWithdrawalStatus?: string;
  isWithdrawalRequestButtonDisabled: boolean = true;
  isWelcomeLetterDialogVisible: boolean = false;
  private hasWelcomeLetterBeenShown: boolean = false;
  studentId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private studentProgramProvisionalService: StudentProgramProvisionalService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private operationalVerticalSubjectService: OperationalVerticalSubjectService,
    private studentRegisterService: StudentRegisterService,
    private dateFormatterService: DateFormatterService,
    private localstorageService: LocalstorageService,
    private titlecasePipe: TitleCasePipe,
    private withdrawService: WithdrawService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializePaymentFormGroup();
    const storedFlag = sessionStorage.getItem(`welcomeLetterShown_${this.provisionalNumber}`);
    this.hasWelcomeLetterBeenShown = storedFlag === 'true';
    this.initializeWithdrawalFormGroup();
    this.route.paramMap.subscribe(params => {
      const provisionalNumber = params.get('provisionalNumber');
      const phoneNumber = params.get('phoneNumber');
      const email = params.get('email');
      this.studentEmail = email ?? '';
      this.provisionalNumber = provisionalNumber ?? '';
      this.studentPhonenumber = phoneNumber ?? '';
      const tab = params.get('tab')?.toLowerCase();

      if (tab === 'program') {
        this.activeTabIndex = 0;
      } else if (tab === 'fees') {
        this.activeTabIndex = 1;
      } else if (tab === 'challan') {
        this.activeTabIndex = 2;
      } else if (tab === 'withdraw') {
        this.activeTabIndex = 3;
      } else if (tab === 'refundpolicy') {
        this.activeTabIndex = 4;
      } else {
        this.activeTabIndex = 0;
      }

      if (provisionalNumber && phoneNumber && email) {
        const storageKey = `${provisionalNumber}_${phoneNumber}_${email}`;
        const storedData = this.localstorageService.getItem(storageKey);

        console.log("storedData: ", storedData);
        if (storedData &&
          storedData.provisionalNumber === provisionalNumber &&
          storedData.phoneNumber === phoneNumber &&
          storedData.emailAddress === email) {
          this.getStudentRegisterByPhonenumber(phoneNumber);
          this.getStudentProvisionalFeeDetailByPhoneNumber(phoneNumber, provisionalNumber);
        } else {
          this.router.navigate(['/admissions/student-onboarding/login']);
          return;
        }
      } else {
        this.router.navigate(['/admissions/student-onboarding/login']);
        return;
      }


    });

    // Safe localStorage access
    try {
      const data = localStorage.getItem('currentUser');
      if (data) {
        this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }

    this.partnerCode = environment.partner.partnerCode;

    this.getStudentOnBoardingWithdrawalByAdmissionNumber();
  }

  initializePaymentFormGroup(): void {
    this.paymentFormGroup = this.fb.group({
      id: [0],
      registrationNumber: ['', Validators.required],
      programName: ['', Validators.required],
      operationalVerticalId: ['', Validators.required],
      createdBy: [''],
      createdByName: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedByName: [''],
      modifiedDate: [''],
    });
  }

  onAccountNumberInput(event: any): void {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    this.withdrawalFormGroup.get('accountNumber')?.setValue(event.target.value);
  }


  setActiveTab(index: number): void {
    this.activeTabIndex = index;
    let tabName: string = '';
    if (index === 0) {
      tabName = 'program';
    } else if (index === 1) {
      tabName = 'fees';
    } else if (index === 2) {
      tabName = 'challan';
    } else if (index === 3) {
      tabName = 'withdraw';
    } else if (index === 4) {
      tabName = 'refundpolicy';
    }
    this.router.navigate([
      '/admissions/student-onboarding/student-onboarding-overview',
      tabName,
      this.provisionalNumber,
      this.studentPhonenumber,
      this.studentEmail
    ]);
    // if (index === 2) {
    //   this.admissionWithdrawalTab();
    // }
  }
  //#region Program Tab

  getStudentRegisterByPhonenumber(phoneNumber: string): void {
    this.isLoading = true;
    this.studentRegisterService.getStudentRegisterByPhoneNumber(phoneNumber).subscribe({
      next: (res) => {
        this.password = res.password;
        this.referenceNumber = res.registrationFeeTransactionId;
        this.studentProgramProvisional = res;
        const academicSessionIds = [this.studentProgramProvisional.academicSessionId].filter((id): id is number => typeof id === 'number');
        const programIds = [this.studentProgramProvisional.programId].filter((id): id is number => typeof id === 'number');
        const operationalVerticalIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const studentInfo = [
          { label: 'Applicant Number:', value: res?.applicantNumber || '' },
          { label: 'Admission Number:', value: res?.provisionalNumber || '' },
          { label: 'Admission Date:', value: res?.dateOfAdmission || '' },
          { label: 'Student Name:', value: res?.studentName || '' },
          { label: 'Aadhar Number:', value: res?.aadharNumber || '' },
          { label: 'Date of Birth:', value: res?.dateOfBirth || '' },
          { label: 'Gender:', value: res?.gender || '' },
          { label: 'Blood Group:', value: res?.bloodGroup || '' },
          { label: 'Father\'s Name:', value: res?.fatherName || '' },
          { label: 'Mother\'s Name:', value: res?.motherName || '' },
          {
            label: 'Address:',
            value: `${res?.address1 || ''}, ${res?.address2 || ''}, ${res?.city || ''}, ${res?.state || ''}`
          },
          { label: 'Phone Number:', value: res?.phoneNumber || '' },
          { label: 'Email:', value: res?.emailAddress || '' }
        ];

        this.studentInfoPairs = [];
        for (let i = 0; i < studentInfo.length; i += 2) {
          const needsTitleCase1 = ['Student Name:', 'Father\'s Name:', 'Mother\'s Name:'].includes(studentInfo[i].label);
          const needsTitleCase2 = studentInfo[i + 1] ? ['Student Name:', 'Father\'s Name:', 'Mother\'s Name:'].includes(studentInfo[i + 1].label) : false;

          const value1 = needsTitleCase1 ? this.titlecasePipe.transform(studentInfo[i].value) : studentInfo[i].value;
          const value2 = studentInfo[i + 1] ? (needsTitleCase2 ? this.titlecasePipe.transform(studentInfo[i + 1].value) : studentInfo[i + 1].value) : '';

          this.studentInfoPairs.push({
            label1: studentInfo[i].label,
            value1,
            label2: studentInfo[i + 1]?.label || '',
            value2,
            needsTitleCase1,
            needsTitleCase2
          });
        }

        this.paymentResponseId = res.registrationFeeTransactionId;
        this.isLoading = false;

        if (this.referenceNumber !== null && this.referenceNumber !== '') {
          this.getFeeReceiptByProvisionalStudentIdAndReferenceNumber(this.provisionalNumber, this.referenceNumber);
        }

        //temporarily commented out to avoid unnecessary API calls
        //this.getOperationalVerticalSubjectSearchRequest(academicSessionIds, programIds, operationalVerticalIds);
      },
      error: (err) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message || 'An error occurred while fetching student data',
          life: 3000
        });
      }
    });
  }

  getOperationalVerticalSubjectSearchRequest(academicSessionIds: number[], programIds: number[], operationalVerticalIds: number[]): void {
    this.isLoading = true;
    const searchRequest = {
      academicSessionIds: academicSessionIds,
      programIds: programIds,
      operationalVerticalIds: operationalVerticalIds
    };

    this.operationalVerticalSubjectService.getOperationalVerticalSubjectSearchResponse(searchRequest).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.processCourseStructure(res);
      },
      error: (err) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message || 'An error occurred while fetching course structure',
          life: 3000
        });
      }
    });
  }

  processCourseStructure(response: any): void {
    try {
      const academicSession = response.academicSessionExpandos[0].name;
      const [startYear, endYear] = academicSession.split('-').map(Number);
      this.totalYears = endYear - startYear;
      const semestersPerYear = 2;
      const operationalVerticalSubjects = response.operationalVerticalSubjects.filter(
        (subject: any) => subject.status === 'PUBLISHED'
      );
      const subjects = response.subjectExpandos;

      const totalSemesters = Math.max(
        ...operationalVerticalSubjects.map((subject: any) => subject.operationalVerticalId),
        0
      );

      const semesterData: { [key: number]: any[] } = {};
      operationalVerticalSubjects.forEach((subject: any) => {
        if (!semesterData[subject.operationalVerticalId]) {
          semesterData[subject.operationalVerticalId] = [];
        }
        semesterData[subject.operationalVerticalId].push(subject);
      });

      this.courseStructure = [];
      for (let i = 1; i <= totalSemesters; i++) {
        const yearIndex = Math.ceil(i / semestersPerYear);
        const semesterSubjects = semesterData[i] || [];

        const subjectNames = semesterSubjects.map(s =>
          subjects.find((sub: any) => sub.id === s.subjectId)?.name || 'Unknown'
        );

        const displayedSubjects = subjectNames.length > 4
          ? subjectNames.slice(0, 4).join(', ') + '...'
          : subjectNames.join(', ');

        const totalCreditsForSemester = semesterSubjects.reduce((sum: number, s: any) => sum + s.creditUnit, 0);

        this.courseStructure.push({
          year: `Year ${yearIndex}`,
          semester: `${i}`,
          subjects: displayedSubjects || 'No Subjects',
          credits: totalCreditsForSemester,
          fullSubjects: semesterSubjects.map(s => ({
            name: subjects.find((sub: any) => sub.id === s.subjectId)?.name || 'Unknown',
            credit: s.creditUnit
          }))
        });
      }

      this.totalCredits = this.courseStructure.reduce((sum, course) => sum + course.credits, 0);
    } catch (error) {
      // console.error('Error processing course structure:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to process course structure',
        life: 3000
      });
    }
  }

  showSubjects(event: Event, course: CourseStructure, op: OverlayPanel): void {
    this.selectedSemesterSubjects = course.fullSubjects;
    op.toggle(event);
  }

  confirmProgram(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to confirm this program?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You have rejected the confirmation'
        });
      }
    });
  }

  raiseDesputes(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to raise disputes for this program?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You have rejected raising disputes'
        });
      }
    });
  }

  //#region Fees Tab

  getStudentProvisionalFeeDetailByPhoneNumber(phoneNumber: string, provisionalStudentId: string): void {
    this.isLoading = true;
    this.studentProgramProvisionalService.getStudentProvisionalFeeDetailByPhoneNumber(phoneNumber, provisionalStudentId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.studentProvisionalFee = res;
        this.provisionalStudentId = res[res.length - 1]?.provisionalStudentId ?? '';
        //this.receiptNumber = res[res.length - 1]?.receiptNumber ?? '';
        if (this.getTotalDueAmount() === 0 && !this.hasWelcomeLetterBeenShown) {
          this.isWelcomeLetterDialogVisible = true;
          this.hasWelcomeLetterBeenShown = true;
          sessionStorage.setItem(`welcomeLetterShown_${this.provisionalNumber}`, 'true');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.message || 'Failed to fetch fee details',
          life: 3000
        });
      }
    });
  }

  getRegistrationFee(): number {
    return this.studentProvisionalFee?.filter((fee: any) =>
      fee.feeComponentName.toLowerCase() === 'provisional admission fee'
    ).reduce((sum: any, fee: any) => sum + fee.feeAmount, 0) || 0;
  }

  getTotalDueAmount(): number {
    return this.studentProvisionalFee?.reduce((sum: any, fee: any) =>
      sum + (fee.feeAmount - fee.paidAmount), 0) || 0;
  }

  getTotalComponentFee(): number {
    return this.studentProvisionalFee?.reduce((sum: any, fee: any) =>
      sum + fee.componentFee, 0) || 0;
  }

  getTotalFeeAmount(): number {
    return this.studentProvisionalFee?.reduce((sum: any, fee: any) =>
      sum + fee.feeAmount, 0) || 0;
  }

  getPerSemesterFee(): number {
    const semesterFeeComponentNames = ['tuition fee', 'development fee', 'exam fee', 'ict fee'];
    return this.studentProvisionalFee?.filter((fee: any) =>
      semesterFeeComponentNames.includes(fee.feeComponentName.toLowerCase())
    ).reduce((sum: any, fee: any) => sum + fee.feeAmount, 0) || 0;
  }

  createOrder(): void {
    this.isMakePaymentBtnVisible = true;
    this.isContinuePaymentBtnVisible = false;
    this.isButtonLoading = true;

    const onlinePaymentReference = {
      paymentGateway: 'RazorPay',
      // feeAmount: 1,
      // paidAmount: 1,
      feeAmount: this.getTotalFeeAmount(),
      paidAmount: this.getTotalDueAmount(),
      adjustedAmount: 0,
      paymentStatus: "Initiate",
      registrationNumber: this.provisionalNumber,
      status: "PUBLISHED",
      requestDate: this.dateFormatterService.ConvertLocalDateTimeString(new Date()),
      currency: '',
      paymentId: '',
      paymentCode: '',
      paymentStep: '',
      paymentEntity: '',
      paymentReason: '',
      paymentSource: '',
      receiptNumber: '',
      paymentOrderId: '',
      paymentReceipt: '',
      paymentMetaData: '',
      paymentModeType: '',
      referenceNumber: '',
      paymentSignature: '',
      transactionNumber: '',
      paymentDescription: ''
    };

    const onlinePaymentReferenceDetails: any = [];

    this.studentProvisionalFee.forEach(x => {
      const onlinePaymentReferenceDetail = {
        // feeAmount: 0.125,
        // paidAmount: 0.125,
        // lastDueAmount: 0.125,
        feeAmount: x.feeAmount,
        paidAmount: x.dueAmount,
        lastDueAmount: x.feeAmount,
        adjustedAmount: 0,
        feeComponentId: x.feeComponentId,
        operationalVerticalId: x.operationalVerticalId,
        programId: x.programId,
        status: 'PUBLISHED',
        studentFeeMasterId: 0
      };

      onlinePaymentReferenceDetails.push(onlinePaymentReferenceDetail);
    });

    const onlinePaymentReferenceRequest = {
      onlinePaymentReference: onlinePaymentReference,
      onlinePaymentReferenceDetails: onlinePaymentReferenceDetails
    };

    this.studentProgramProvisionalService.saveOnlinePaymentRequest(onlinePaymentReferenceRequest)
      .then((x: any) => {
        if (x) {
          this.isButtonLoading = false;
          this.isMakePaymentBtnVisible = false;
          this.isContinuePaymentBtnVisible = true;
          const activePartner = environment.partner;
          if (activePartner) {
            this.razorPayCheckOutRequest = {
              keyId: activePartner.razorPay.apiKey,
              callbackUrl: activePartner.razorPay.onBoardingPaymentCallbackUrl + "?order_id=" + x.paymentOrderResponse.id + "&partnerCode=" + this.partnerCode,
              description: x.onlinePaymentReference.registrationNumber,
              email: this.studentEmail,
              orderAmount: x.paymentOrderResponse.amount,
              phoneNumber: this.studentPhonenumber,
              razorpayOrderId: x.paymentOrderResponse.id,
              studentName: this.studentProgramProvisional?.studentName,
              transactionId: x.paymentOrderResponse.receipt,
            };
          }
        } else {
          this.isButtonLoading = false;
          this.isMakePaymentBtnVisible = true;
          this.isContinuePaymentBtnVisible = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
            life: 3000
          });
        }
      })
      .catch((error: any) => {
        this.isButtonLoading = false;
        this.isMakePaymentBtnVisible = true;
        this.isContinuePaymentBtnVisible = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.message || 'Payment order creation failed',
          life: 3000
        });
      });
  }

  //#endregion
  //#region Generate Challan

  generateChallan() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to generate challan?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const paymentChallanSearchRequest: PaymentChallanOnboarding = {
          provisionalStudentId: this.provisionalStudentId,
          academicSessionIds: [this.studentProgramProvisional.academicSessionId ?? 0],
          programIds: [this.studentProgramProvisional.programId ?? 0],
          operationalVerticalIds: [this.studentProgramProvisional.operationalVerticalId ?? 0],
          feeComponentIds: this.studentProvisionalFee.map(fee => fee.feeComponentId).filter((id): id is number => typeof id === 'number')
        };

        this.isLoading = true;

        this.studentProgramProvisionalService.downloadPaymentChallanOnboardingByPaymentChallanSearchRequest(paymentChallanSearchRequest).subscribe({
          next: data => {
            const filename = this.provisionalStudentId?.replace('/', '_') + ".pdf";
            saveAs(data, filename);
            this.isLoading = false;
          }, error: error => {
            this.isLoading = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'Failed to generate challan', life: 3000 });
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected the confirmation' });
      }
    });
  }

  //#endregion

  logout(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          localStorage.clear();
          this.router.navigate(['/admissions/student-onboarding/login']);
        } catch (error) {
          console.error('Error during logout:', error);
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'Logout cancelled'
        });
      }
    });
  }
  //#endregion

  //#region Admission Withdrawal Tab
  initializeWithdrawalFormGroup(): void {
    this.withdrawalFormGroup = this.fb.group({
      id: [0],
      provisionalNumber: this.provisionalNumber,
      phoneNumber: this.studentPhonenumber,
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      ifscCode: ['', Validators.required],
      accountHolderName: ['', Validators.required],
      withdrawalReason: ['', Validators.required],
      withdrawalStatus: [''],
      refundDescription: [''],
      holdReason: [''],
      partnerCode: [''],
      modifiedDate: [''],
      isCanceledRequest: [false],
      fileUrl: [''],
      createdBy: [''],
      createdDate: [''],
    });
  }
  documentUpload(event: any, fileUpload: any) {
    this.isFileError = false;
    this.fileError = '';
    const file = event.files[0];

    if (file.type !== 'image/jpeg' || file.size > 10000000) {
      this.isFileError = true;
      if (file.type !== 'image/jpeg' || file.type !== 'image/jpg') {
        this.fileError = "Please upload .jpeg/jpg file format."
      }
      if (file.size > 10000000) {
        this.fileError = "File size should not be more than 1 MB";
      }
    }
    else {
      this.formData.append('ChequeBookFile', file);
      this.fileName = file.name;
    }
    fileUpload.remove();
  }
  onSubmitWithdrawalRequest() {
    if (this.currentWithdrawalStatus == 'CANCELLED' || this.currentWithdrawalStatus == 'REQUEST ON HOLD' || this.currentWithdrawalStatus == undefined) {
      this.withdrawalRequestConfirmationBox = true;
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure you want to cancel your withdrawal request? This action is not reversible.',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.withdrawalRequestConfirmation();
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Rejected',
            detail: 'You have rejected the confirmation'
          });
        }
      });
    }
  }
  getStudentOnBoardingWithdrawalByAdmissionNumber() {

    this.formData = new FormData;
    this.fileName = '';
    this.withdrawService.getStudentOnBoardingWithdrawalByAdmissionNumber(this.provisionalNumber).subscribe({
      next: (response) => {
        if (response) {
          this.withdrawalFormGroup.patchValue(response)
          this.withdrawalStatusList = [];
          this.currentWithdrawalStatus = response.withdrawalStatus;
          if (response.withdrawalStatus === 'REQUESTED') {
            this.withdrawalStatusList.push({
              status: response.withdrawalStatus, statusDate: response.createdDate,
              icon: 'pi pi-clock', colorClass: 'text-primary'
            });
          } else if (response.withdrawalStatus === 'REQUEST ON HOLD') {
            this.withdrawalStatusList.push({
              status: response.withdrawalStatus, statusDate: response.holdDate,
              icon: 'pi pi-pause', colorClass: 'text-warning'
            });
            this.withdrawalFormGroup.value.holdReason = response.holdReason;
          } else if (response.withdrawalStatus === 'REFUND ISSUED') {
            this.withdrawalStatusList.push({
              status: response.withdrawalStatus, statusDate: response.refundDate,
              icon: 'pi pi-check-circle', colorClass: 'text-success'
            });
            this.withdrawalFormGroup.value.refundDescription = response.refundDescription;
            this.totalRefund = response.totalRefund || 0;
          } else if (response.withdrawalStatus === 'CANCELLED') {
            this.withdrawalStatusList.push({
              status: response.withdrawalStatus, statusDate: response.modifiedDate,
              icon: 'pi pi-times-circle', colorClass: 'text-danger'
            });
          } else if (response.withdrawalStatus === 'RE-REQUEST') {
            this.withdrawalStatusList.push({
              status: response.withdrawalStatus, statusDate: response.modifiedDate,
              icon: 'pi pi-refresh', colorClass: 'text-secondary'
            });
          }

          this.isWithdrawalDisabled = !(this.withdrawalStatusList.length === 1 && (this.withdrawalStatusList[0].status === 'REQUEST ON HOLD'
            || this.withdrawalStatusList[0].status === 'CANCELLED'));
          this.isCancelRequest = this.withdrawalStatusList.some(s => s.status === 'REQUEST ON HOLD' || s.status === 'REQUESTED' || s.status === 'RE-REQUEST');
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error ', detail: error.message, life: 3000 });
      }
    });
  }
  withdrawalRequestConfirmation() {
    //const formData = new FormData();
    if (this.currentWithdrawalStatus == 'CANCELLED') {
      this.withdrawalFormGroup.value.id = 0;
      this.withdrawalFormGroup.value.withdrawalStatus = 'RE-REQUEST';
    }
    this.withdrawalFormGroup.value.provisionalNumber = this.provisionalNumber;
    this.withdrawalFormGroup.value.partnerCode = this.partnerCode;
    this.withdrawalFormGroup.value.phoneNumber = this.studentPhonenumber;
    if (this.withdrawalFormGroup.value.id == 0 && this.currentWithdrawalStatus !== 'CANCELLED') {
      this.withdrawalFormGroup.value.withdrawalStatus = 'REQUESTED';
    }
    for (const key in this.withdrawalFormGroup.value) {
      if (this.withdrawalFormGroup.value[key] !== undefined && this.withdrawalFormGroup.value[key] !== null) {
        this.formData.append(key, this.withdrawalFormGroup.value[key]);
      }
    }
    this.withdrawalRequestConfirmationBox = false;
    this.withdrawService.saveWithdrawalRequest(this.formData).subscribe({
      next: (res) => {
        this.withdrawalFormGroup.reset();
        this.getStudentOnBoardingWithdrawalByAdmissionNumber();
        this.isWithdrawalRequestButtonDisabled = true;
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Request has been submitted successfully.' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
      }
    })
  }
  cancelRequestChange(event: any) {
    const isCancelled = event.checked;

    this.withdrawalFormGroup.patchValue({
      withdrawalStatus: isCancelled ? 'CANCELLED' : this.currentWithdrawalStatus,
      isCanceledRequest: isCancelled
    });
    if (isCancelled) {
      this.isWithdrawalRequestButtonDisabled = false;
    } else {
      this.isWithdrawalRequestButtonDisabled = true;
    }
  }
  onDownloadWithdrawalPolicyPdf() {
    const pdfUrl = '/assets/Partner_Documents/' + this.partnerCode + '/RefundPolicySBU.pdf';
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.target = '_blank';
      link.download = 'RefundPolicySBU.pdf';
      link.click();

      URL.revokeObjectURL(blobUrl);
    });
  }
  //#endregion

  // #payment success api call
  getFeeReceiptByProvisionalStudentIdAndReferenceNumber(provisionalStudentId: string, referenceNumber: string) {
    if (referenceNumber !== null && referenceNumber === '' && referenceNumber !== undefined) {
      this.studentProgramProvisionalService.getFeeReceiptByProvisionalStudentIdAndReferenceNumber(provisionalStudentId, referenceNumber).subscribe({
        next: (x: any) => {
          if (x.referenceNumber != "") {
            this.studentId = x.studentId;
            this.password = x.password;
          }
        }, error: error => {
          this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
        }
      });
    }
  }

  // #endregion
}

interface CourseStructure {
  year: string;
  semester: string;
  subjects: string;
  credits: number;
  fullSubjects: { name: string, credit: number }[];
}
interface WithdrawalStatus {
  status?: string;
  statusDate?: Date;
  icon?: string;
  colorClass?: string;
}