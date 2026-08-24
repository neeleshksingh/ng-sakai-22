import { Component, OnInit } from '@angular/core';
import { StudentFamilyService } from 'src/app/big-leads/services/student-family.service';
import { StudentFamily } from 'src/app/shared/models/bigleads/student-family';

@Component({
  selector: 'app-student-family-details',
  standalone: false,
  templateUrl: './student-family-details.component.html',
  styleUrl: './student-family-details.component.scss'
})
export class StudentFamilyDetailsComponent implements OnInit {

  studentFamily!: StudentFamily[];
  tableArrayFamilyDetails: any[] = [];
  tableArrayFamilyDetailsList: any[] = [];

  constructor(private studentFamilyService: StudentFamilyService) { }

  ngOnInit(): void {
    this.studentFamilyService.studentFamilies.subscribe(response => {
      this.studentFamily = response;
      if (this.studentFamily?.length > 0) {
        this.tableArrayFamilyDetailsList = [];
        this.familyDetailsTableFormate();
      }
    });
  }
  familyDetailsTableFormate() {
    this.studentFamily.forEach(data => {
      this.tableArrayFamilyDetails = [];
      this.tableArrayFamilyDetails.push(
        { col1: 'Relation:', col2: data.familyRelationName, col3: 'Title:', col4: data.title },
        { col1: 'FirstName:', col2: data.firstName, col3: 'MiddleName:', col4: data.middleName },
        { col1: 'LastName:', col2: data.lastName, col3: 'DOB:', col4: data.dOB },
        { col1: 'BloodGroup:', col2: data.bloodGroup, col3: 'PhoneNumber:', col4: data.phoneNumber },
        { col1: 'Email:', col2: data.email },
      );
      this.tableArrayFamilyDetailsList.push(this.tableArrayFamilyDetails);
    });
  }
}
