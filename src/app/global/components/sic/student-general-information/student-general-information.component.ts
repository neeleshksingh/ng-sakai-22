import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StudentService } from 'src/app/global/services/big-leads/student.service';
import { SharedModule } from '@/shared.module';
import { Student } from 'src/app/shared/models/bigleads/student';
import { StudentAddressDetailsComponent } from '../student-address-details/student-address-details.component';
import { StudentFamilyDetailsComponent } from '../student-family-details/student-family-details.component';

@Component({
  selector: 'app-student-general-information',
  standalone: true,
  imports: [SharedModule, StudentAddressDetailsComponent, StudentFamilyDetailsComponent],
  templateUrl: './student-general-information.component.html',
  styleUrls: ['./student-general-information.component.scss']
})
export class StudentGeneralInformationComponent implements OnInit {
  student: Student = {};
  tableArrayGeneralDetails: any[] = [];
  isABCIDVerified: boolean = false;
  @Input() studentId: string = '';
  private previousStudentId: string = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev.get('studentId') === curr.get('studentId'))
    ).subscribe(params => {
      const newStudentId = params.get('studentId') || '';
      if (newStudentId && newStudentId !== this.previousStudentId) {
        this.clearSessionStorage();
        this.studentId = newStudentId;
        this.previousStudentId = newStudentId;
        const cachedStudent = this.getCachedStudent(newStudentId);
        if (cachedStudent) {
          this.student = cachedStudent;
          this.generalDetailsTableFormate();
          this.student.studentFullName = `${this.student.firstName || ''} ${this.student.middleName || ''} ${this.student.lastName || ''}`.trim();
          this.student.identityImagePath = this.student.identityImagePath
            ? this.student.identityImagePath.replace(/\\/g, '/')
            : '../assets/layout/images/icon-profile.png';
        } else {
          this.getStudentData(newStudentId);
        }
      }
    });
    this.checkIfABCIdVerified();
  }

  private getCachedStudent(studentId: string): Student | null {
    const cachedData = sessionStorage.getItem(`student_${studentId}`);
    if (cachedData) {
      try {
        return JSON.parse(cachedData) as Student;
      } catch (e) {
        console.error('Error parsing cached student data:', e);
        return null;
      }
    }
    return null;
  }

  private saveCachedStudent(studentId: string, student: Student) {
    try {
      sessionStorage.setItem(`student_${studentId}`, JSON.stringify(student));
    } catch (e) {
      console.error('Error saving student to sessionStorage:', e);
    }
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`student_${this.previousStudentId}`);
    }
  }

  getStudentData(studentId: string) {
    this.studentService.GetByStudentId(studentId).subscribe(response => {
      if (response) {
        this.student = response;
        this.saveCachedStudent(studentId, this.student);
        this.generalDetailsTableFormate();
        this.student.studentFullName = `${this.student.firstName || ''} ${this.student.middleName || ''} ${this.student.lastName || ''}`.trim();
        this.student.identityImagePath = this.student.identityImagePath
          ? this.student.identityImagePath.replace(/\\/g, '/')
          : '../assets/layout/images/icon-profile.png';
      } else {
        this.student = {};
        this.tableArrayGeneralDetails = [];
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });
  }

  refreshGeneralDetails(): void {
    if (this.studentId) {
      this.clearSessionStorage();
      this.getStudentData(this.studentId);
    }
  }

  generalDetailsTableFormate(): void {
    this.tableArrayGeneralDetails = [];
    this.tableArrayGeneralDetails.push(
      {
        col1: 'StudentId:', col2: this.student.studentId,
        col3: 'ABCID:', col4: this.student.abcid,
        col5: 'AdmissionDate:', col6: this.datePipe.transform(this.student.admissionDate, 'd-MMM-yyyy'),
        col7: 'Title:', col8: this.student.title
      },
      {
        col1: 'FirstName:', col2: this.student.firstName,
        col3: 'MiddleName:', col4: this.student.middleName,
        col5: 'LastName:', col6: this.student.lastName,
        col7: 'DOB:', col8: this.student.dob
      },
      {
        col1: 'Gender:', col2: this.student.gender,
        col3: 'MaritalStatus:', col4: this.student.maritalStatus,
        col5: 'BloodGroup:', col6: this.student.bloodGroup,
        col7: 'PhoneNumber:', col8: this.student.phoneNumber
      },
      {
        col1: 'Email:', col2: this.student.email,
        col3: 'AlternatePhoneNumber:', col4: this.student.alternatePhoneNumber,
        col5: 'AlternateEmail:', col6: this.student.alternateEmail,
        col7: 'Caste:', col8: this.student.casteName
      },
      {
        col1: 'CasteCategory:', col2: this.student.casteCategoryName,
        col3: 'Religion:', col4: this.student.religionName,
        col5: 'MotherTongue:', col6: this.student.motherTongue,
        col7: 'AadharNumber:', col8: this.student.aadharNumber
      },
      {
        col1: 'VoterID:', col2: this.student.voterId,
        col3: 'PAN:', col4: this.student.pan,
        col5: 'IsPhysicallyHandicapped:', col6: this.student.isPhysicallyHandicaped ? 'Yes' : 'No',
        col7: 'IsMinority:', col8: this.student.isMinority ? 'Yes' : 'No'
      }
    );
  }

  checkIfABCIdVerified() {
    const cachedProgramData = sessionStorage.getItem(`basic_studentProgram_${this.studentId}`);
    if (cachedProgramData) {
      const programData = JSON.parse(cachedProgramData);
      this.isABCIDVerified = programData.isABCIDVerified;
    }
  }

  navigateToVerification() {
    this.router.navigate([`/home/knowledgestand/reports/students/student-information-center/verify/${this.studentId}/2`])
      .then(() => {
        // Reload the page after successful navigation
        window.location.reload();
      });
  }
}