import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { Student, StudentOTPValidate, UserOTPDetails } from 'src/app/shared/models/students/student';
import { SMSService } from '../../services/sms.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-profile-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-profile-update.component.html',
  styleUrl: './student-profile-update.component.scss'
})
export class StudentProfileUpdateComponent implements OnInit {
  student: Student = {};
  userOTPRequest!: UserOTPDetails;
  studentOTPValidate: StudentOTPValidate = {};
  userOTPResponse!: UserOTPDetails;
  studentDetailsUpdateGroup!: FormGroup;
  otpGroup!: FormGroup;
  phoneNumberPattern = "^[0-9]*$";
  emailPattern = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  isOTPDialogVisible: boolean = false;
  isOTPError: boolean = false;
  otpErrorMessage: string = '';
  isLoading: boolean = true;
  skeletonValue: number[] = Array(4).fill(1);

  maritalList: SelectItem[] = [];
  bloodGroupList: SelectItem[] = [];
  motherToungeList: SelectItem[] = [];
  studentFields: any[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private messageService: MessageService,
    private sMSService: SMSService) { }

  ngOnInit(): void {
    this.isOTPDialogVisible = false;
    this.isOTPError = false;
    this.userOTPRequest = {};
    this.getMaritalList();
    this.getBloodGroupList();
    this.getMotherTongueList();
    this.initializeStudentDetailsUpdateGroup();
    this.initializeOTPGroup();
    this.GetGeneralDetails();
  }
  getMaritalList() {
    this.maritalList = [
      { label: 'Single', value: 'Single' },
      { label: 'Married', value: 'Married' },
      { label: 'Widowed', value: 'Widowed' },
      { label: 'Separated', value: 'Separated' },
      { label: 'Divorced', value: 'Divorced' }
    ];
  }
  getBloodGroupList() {
    this.bloodGroupList = [
      { label: 'A+', value: 'A+' },
      { label: 'A-', value: 'A-' },
      { label: 'B+', value: 'B+' },
      { label: 'B-', value: 'B-' },
      { label: 'O+', value: 'O+' },
      { label: 'O-', value: 'O-' },
      { label: 'AB+', value: 'AB+' },
      { label: 'AB-', value: 'AB-' }
    ];
  }
  getMotherTongueList() {
    this.motherToungeList = [
      { label: 'Hindi', value: 'Hindi' },
      { label: 'Nagpuri', value: 'Nagpuri' },
      { label: 'Khortha', value: 'Khortha' },
      { label: 'Bhojpuri', value: 'Bhojpuri' },
      { label: 'Bengali', value: 'Bengali' },
      { label: 'Odia', value: 'Odia' },
      { label: 'English', value: 'English' }
    ];
  }

  initializeStudentDetailsUpdateGroup() {
    this.studentDetailsUpdateGroup = this.fb.group({
      studentId: [''],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.phoneNumberPattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      alternatePhoneNumber: ['', [Validators.maxLength(10), Validators.pattern(this.phoneNumberPattern)]],
      alternateEmail: ['', Validators.pattern(this.emailPattern)],
      displayName: [''],
      maritalStatus: [''],
      bloodGroup: [''],
      motherTongue: [''],
      abcid: [''],

      casteName: [''],
      casteCategoryName: [''],
      religionName: [''],
      studentImageUrl: [''],
      id: [0],
      provisionalStudentId: [''],
      admissionDate: [''],
      title: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      aadharNumber: ['', [Validators.maxLength(12), Validators.pattern(/^\d{12}$/)]],
      voterId: [''],
      pan: ['', Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)],
      isPhysicallyHandicaped: [null],
      casteId: [0],
      casteCategoryId: [0],
      religionId: [0],
      isMinority: [null],
      identityImagePath: [''],
      status: [''],
      createdBy: [''],
      modifiedBy: [''],
      createdDate: [''],
      modifiedDate: ['']
    });
  }
  initializeOTPGroup() {
    this.otpGroup = this.fb.group({
      id: 0,
      otp: ['', [Validators.required, Validators.maxLength(6)]],
      purpose: ['']
    });
  }

  GetGeneralDetails() {
    this.student = {};
    this.studentService.GetStudentProfile().subscribe({
      next: (data) => {
        this.student = data;
        this.studentDetailsUpdateGroup.patchValue(this.student);
        this.studentFields = [
          { icon: 'pi-user', label: 'First Name', key: 'firstName' },
          { icon: 'pi-user', label: 'Middle Name', key: 'middleName' },
          { icon: 'pi-user', label: 'Last Name', key: 'lastName' },
          { icon: 'pi-calendar', label: 'Date of Birth', key: 'dob' },
          { icon: 'pi-user', label: 'Gender', key: 'gender' },
          { icon: 'pi-calendar-plus', label: 'Admission Date', key: 'admissionDate' },

          { icon: 'pi-id-card', label: 'Aadhar Number', key: 'aadharNumber' },
          { icon: 'pi-bookmark', label: 'Voter ID', key: 'voterId' },
          { icon: 'pi-credit-card', label: 'PAN', key: 'pan' },
          { icon: 'pi-user', label: 'Provisional Student ID', key: 'provisionalStudentId' },

          { icon: 'pi-tags', label: 'Caste Name', key: 'casteName' },
          { icon: 'pi-tag', label: 'Caste Category Name', key: 'casteCategoryName' },
          { icon: 'pi-sun', label: 'Religion Name', key: 'religionName' },
          { icon: 'pi-users', label: 'Is Minority', key: 'isMinority' },
          { icon: 'pi-user', label: 'Physically Handicapped', key: 'isPhysicallyHandicaped' },
        ];
        this.isLoading = false;
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
        this.isLoading = false;
      }
    });
  }
  UpdateStudentProfile() {
    this.otpGroup.value.otp = '';
    this.userOTPRequest.userName = this.studentDetailsUpdateGroup.value.studentId;
    this.userOTPRequest.phoneNumber = this.studentDetailsUpdateGroup.value.phoneNumber;
    this.userOTPRequest.purpose = "Update details";

    this.sMSService.sendOTP(this.userOTPRequest).subscribe({
      next: (data) => {
        //this.isOTPError = true;
        // this.otpErrorMessage = 'We have sent OTP to ' +this.userOTPRequest.phoneNumber;
        this.userOTPResponse = data;
        this.isOTPDialogVisible = true;
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    });
  }
  ValidateOTPandUpdateStudentProfile() {
    this.userOTPResponse.otp = this.otpGroup.value.otp;
    this.studentOTPValidate.userOTPValidateRequest = this.userOTPResponse;
    const formValue = this.studentDetailsUpdateGroup.value;
    this.studentOTPValidate.student = {
      ...formValue,
      admissionDate: formValue.admissionDate ? new Date(formValue.admissionDate).toISOString() : null,
      createdDate: formValue.createdDate ? new Date(formValue.createdDate).toISOString() : null,
      modifiedDate: formValue.modifiedDate ? new Date(formValue.modifiedDate).toISOString() : null,
      dob: formValue.dob ? new Date(formValue.dob).toISOString() : null
    };
    this.studentService.UpdateStudentProfile(this.studentOTPValidate).subscribe({
      next: (data) => {
        this.isOTPDialogVisible = false;
        this.student = data;
        this.studentDetailsUpdateGroup.patchValue(this.student);
        this.isOTPError = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Profile updated Successfully.',
          life: 3000
        });
      },
      error: (err) => {
        this.isOTPError = true;
        this.otpErrorMessage = err.error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
          life: 3000
        });
      }
    });
  }
}



