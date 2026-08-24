import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/models/bigleads/student';
import { StudentService } from '../../../services/big-leads/student.service';

@Component({
  selector: 'app-student-general-details',
  standalone: false,
  templateUrl: './student-general-details.component.html',
  styleUrl: './student-general-details.component.scss'
})
export class StudentGeneralDetailsComponent implements OnInit {
  student: Student = {};
  tableArrayGeneralDetails: any[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.student.subscribe(response => {
      if (response) {
        this.student = response;
      }
      if (this.student?.id) {
        this.generalDetailsTableFormate();
        this.student.studentFullName = this.student?.firstName + ' ' + this.student?.middleName + ' ' + this.student?.lastName;
        if (this.student?.identityImagePath) {
          this.student.identityImagePath = this.student?.identityImagePath.replace("\\", "/");
        } else {
          this.student.identityImagePath = './../assets/layout/images/icon-profile.png';
        }
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
}
