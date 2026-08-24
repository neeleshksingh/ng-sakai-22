import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { Student } from 'src/app/shared/models/students/student';
import { StudentAddress } from 'src/app/shared/models/students/student-address';
import { StudentFamily } from 'src/app/shared/models/students/student-family';
import { StudentAddressService } from '../../services/student-address.service';
import { StudentFamilyService } from '../../services/student-family.service';
import { StudentProgramService } from '../../services/student-program.service';
import { StudentStatusService } from '../../services/student-status-copy.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent implements OnInit {
  student: Student = {};
  studentPrograms: StudentProgram[] = [];
  studentFamilies: StudentFamily[] = [];
  studentAddresses: StudentAddress[] = [];
  displayImageUrl: string = '';
  display: boolean = true;
  studentName: string = '';
  studentId: string = '';
  phoneNumber: string = '';
  email: string = '';
  downloadIDCardDialog: boolean = false;
  sbuImageUrl: string = '';
  isLoading: boolean = true;
  isDisplay: boolean = true;
  skeletonValue: number[] = Array(4).fill(1);
  tableArrayGeneralDetails: any[] = [];
  tableArrayStudentProgramsList: any[] = [];
  studentFamily: StudentFamily[] = [];
  tableArrayFamilyDetails: any[] = [];
  tableArrayFamilyDetailsList: any[] = [];
  studentAddress: StudentAddress[] = [];
  tableArrayAddressDetails: any[] = [];
  tableArrayAddressDetailsList: any[] = [];

  isProgramDetailsLoaded: boolean = false;
  isFamilyDetailsLoaded: boolean = false;
  isAddressDetailsLoaded: boolean = false;

  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  jpegImage: string = '';

  private currentUserSubject!: BehaviorSubject<LoginResponse>;

  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private studentProgramService: StudentProgramService,
    private studentFamilyService: StudentFamilyService,
    private studentAddressService: StudentAddressService,
    private studentStatusService: StudentStatusService
  ) { }

  ngOnInit(): void {
    this.getUserAccountData();
    this.GetGeneralDetails();
  }

  getUserAccountData() {
    var data = localStorage.getItem('currentUser');
    if (data) {
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data));
      if (this.currentUserSubject.value.applicationUser.displayImageUrl) {
        this.displayImageUrl = this.currentUserSubject.value.applicationUser.displayImageUrl;
      }
      else {
        this.displayImageUrl = './assets/layout/images/icon-profile.png';
      }
    }
  }

  GetGeneralDetails() {
    this.student = {};
    this.studentService.GetStudentProfile().subscribe({
      next: (p) => {
        this.studentName = (p.firstName + (p.middleName == undefined ? "" : " " + p.middleName) + (p.lastName == undefined ? "" : " " + p.lastName)).replace("  ", " ");
        this.studentId = p.studentId || '';
        this.email = p.email || '';
        this.phoneNumber = p.phoneNumber || '';
        this.student = p;
        this.student.dob = this.datePipe.transform(p.dob, 'dd-MMM-yyyy') || '';
        this.student.admissionDate = this.datePipe.transform(p.admissionDate, 'dd-MMM-yyyy') || '';
        this.generalDetailsTableFormate()
        this.getStudentStatusByStudentId();
        this.isLoading = false;
      }, error: (err) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    });
  }

  generalDetailsTableFormate() {
    this.tableArrayGeneralDetails = [];
    this.tableArrayGeneralDetails.push(
      { col1: 'StudentId:', col2: this.student.studentId, col3: 'ABCID : ', col4: this.student.abcid },
      { col1: 'AdmissionDate:', col2: this.student.admissionDate, col3: 'Title:', col4: this.student.title },
      { col1: 'FirstName:', col2: this.student.firstName, col3: 'MiddleName:', col4: this.student.middleName },
      { col1: 'LastName:', col2: this.student.lastName, col3: 'DOB:', col4: this.student.dob },
      { col1: 'Gender:', col2: this.student.gender, col3: 'MaritalStatus:', col4: this.student.maritalStatus },
      { col1: 'BloodGroup:', col2: this.student.bloodGroup, col3: 'PhoneNumber: ', col4: this.student.phoneNumber },
      { col1: 'Email:', col2: this.student.email, col3: 'AlternatePhoneNumber: ', col4: this.student.alternatePhoneNumber },
      { col1: 'AlternateEmail:', col2: this.student.alternateEmail, col3: 'Caste: ', col4: this.student.casteName },
      { col1: 'CasteCategory:', col2: this.student.casteCategoryName, col3: 'Religion: ', col4: this.student.religionName },
      { col1: 'MotherTongue:', col2: this.student.motherTongue, col3: 'AadharNumber: ', col4: this.student.aadharNumber },
      { col1: 'VoterID:', col2: this.student.voterId, col3: 'PAN: ', col4: this.student.pan },
      { col1: 'IsPhysicallyHandicapped:', col2: this.student.isPhysicallyHandicaped ? 'Yes' : 'No', col3: 'IsMinority: ', col4: this.student.isMinority ? 'Yes' : 'No' },
    );
  }

  GetStudentProgramDetails() {
    this.studentPrograms = [];
    this.tableArrayStudentProgramsList = [];
    this.studentProgramService.getStudentProgramList().subscribe({
      next: (p) => {
        this.isProgramDetailsLoaded = true; // Mark as loaded
        this.studentPrograms = p.filter(x => x.isCurrentOperationalVertical == true);
        this.studentPrograms.forEach(p => {
          this.tableArrayStudentProgramsList.push(
            { col1: 'AcademicSession:', col2: p.academicSessionName, col3: 'RegistrationNumber:', col4: p.registrationNumber },
            { col1: 'Program:', col2: p.programName, col3: 'CurrentSemester:', col4: p.operationalVerticalName },
          )
        });
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    });
  }

  GetStudentFamily() {
    this.studentFamilies = [];
    this.tableArrayFamilyDetailsList = [];
    this.studentFamilyService.GetStudentFamily().subscribe({
      next: (p) => {
        this.isFamilyDetailsLoaded = true;
        this.studentFamilies = p;
        this.studentFamilies.forEach(data => {
          this.tableArrayFamilyDetails = [];
          this.tableArrayFamilyDetails.push(
            { col1: 'Relation:', col2: data.familyRelationName, col3: 'Title:', col4: data.title },
            { col1: 'FirstName:', col2: data.firstName, col3: 'MiddleName:', col4: data.middleName },
            { col1: 'LastName:', col2: data.lastName, col3: 'DOB:', col4: data.dob },
            { col1: 'BloodGroup:', col2: data.bloodGroup, col3: 'PhoneNumber:', col4: data.phoneNumber },
            { col1: 'Email:', col2: data.email },
          );
          this.tableArrayFamilyDetailsList.push(this.tableArrayFamilyDetails);
        });
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    });
  }

  GetStudentAddress() {
    this.studentAddresses = [];
    this.tableArrayAddressDetailsList = [];
    this.studentAddressService.GetStudentAddress().subscribe({
      next: (p) => {
        this.isAddressDetailsLoaded = true;
        this.studentAddresses = p;
        this.studentAddresses.forEach(data => {
          this.tableArrayAddressDetails = [];
          this.tableArrayAddressDetails.push(
            { col1: 'AddressType:', col2: data.addressType, col3: 'Address:', col4: data.address1 },
            { col1: 'Address2:', col2: data.address2, col3: 'City:', col4: data.city },
            { col1: 'State:', col2: data.state, col3: 'Country:', col4: data.country },
            { col1: 'PostalCode:', col2: data.postalCode },
          );
          this.tableArrayAddressDetailsList.push(this.tableArrayAddressDetails);
        });
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    });
  }

  getStudentStatusByStudentId() {
    if (this.currentUserSubject.value.applicationUser.userName) {
      this.studentStatusService.getByStudentId(this.currentUserSubject.value.applicationUser.userName).subscribe({
        next: (data) => {
          if (data.length == 0 || !data[0].statusDescription) {
            this.student.statusDescription = 'Active'
            this.isLoading = false;
          }
          else {
            this.student.statusDescription = data[0].statusDescription;
            this.isLoading = false;
          }

        }, error: (err) => {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
        }
      })
    }
  }

  handleChange(event: any) {
    var index = typeof event === 'object' && event !== null && 'index' in event ? event.index : Number(event);
    switch (index) {
      case 0: {
        if (this.tableArrayGeneralDetails.length === 0) {
          this.GetGeneralDetails();
        }
        break;
      }
      case 1: {
        if (!this.isProgramDetailsLoaded) {
          this.GetStudentProgramDetails();
        }
        break;
      }
      case 2: {
        if (!this.isFamilyDetailsLoaded) {
          this.GetStudentFamily();
        }
        break;
      }
      case 3: {
        if (!this.isAddressDetailsLoaded) {
          this.GetStudentAddress();
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  editPhoneNumber() {
    this.display = true;
  }

  downloadIDCard() {
    if (!this.isFamilyDetailsLoaded) this.GetStudentFamily();
    if (!this.isProgramDetailsLoaded) this.GetStudentProgramDetails();

    this.downloadIDCardDialog = true;
    this.sbuImageUrl = 'assets/Image/SBU_Logo.jpeg';
  }

  downloadVirtualIdCard() {
    const element = document.getElementById('convertToJpeg');

    if (element) {
      html2canvas(element).then(canvas => {
        canvas.toBlob((blob) => {
          if (blob) {
            FileSaver.saveAs(blob, this.studentId + `Virtual ID Card_${new Date().getTime()}.jpeg`);
          }
        }, 'image/jpeg');
      });
    } else {
      console.error("Element not found!");
    }
  }
}