import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StudentFamilyService } from 'src/app/big-leads/services/student-family.service';
import { SharedModule } from '@/shared.module';
import { StudentFamily } from 'src/app/shared/models/bigleads/student-family';

@Component({
  selector: 'app-student-family-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-family-details.component.html',
  styleUrls: ['./student-family-details.component.scss']
})
export class StudentFamilyDetailsComponent implements OnInit {
  studentFamily: StudentFamily[] = [];
  tableArrayFamilyDetails: any[] = [];
  tableArrayFamilyDetailsList: any[] = [];
  @Input() studentId: string = '';
  private previousStudentId: string = '';

  constructor(
    private studentFamilyService: StudentFamilyService,
    private route: ActivatedRoute,
    private messageService: MessageService
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
        const cachedFamily = this.getCachedFamily(newStudentId);
        if (cachedFamily) {
          this.studentFamily = cachedFamily;
          if (this.studentFamily?.length > 0) {
            this.tableArrayFamilyDetailsList = [];
            this.familyDetailsTableFormate();
          } else {
            this.tableArrayFamilyDetailsList = [];
          }
        } else {
          this.getStudentFamilyByStudentId(newStudentId);
        }
      }
    });
  }

  private getCachedFamily(studentId: string): StudentFamily[] | null {
    const cachedData = sessionStorage.getItem(`studentFamily_${studentId}`);
    if (cachedData) {
      try {
        return JSON.parse(cachedData) as StudentFamily[];
      } catch (e) {
        console.error('Error parsing cached family data:', e);
        return null;
      }
    }
    return null;
  }

  private saveCachedFamily(studentId: string, family: StudentFamily[]) {
    try {
      sessionStorage.setItem(`studentFamily_${studentId}`, JSON.stringify(family));
    } catch (e) {
      console.error('Error saving family to sessionStorage:', e);
    }
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`studentFamily_${this.previousStudentId}`);
    }
  }

  getStudentFamilyByStudentId(studentId: string) {
    this.studentFamilyService.getStudentFamilyByStudentId(studentId).subscribe(response => {
      this.studentFamily = response;
      this.saveCachedFamily(studentId, this.studentFamily);
      if (this.studentFamily?.length > 0) {
        this.tableArrayFamilyDetailsList = [];
        this.familyDetailsTableFormate();
      } else {
        this.tableArrayFamilyDetailsList = [];
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });
  }

  refresh(): void {
    if (this.studentId) {
      this.clearSessionStorage();
      this.getStudentFamilyByStudentId(this.studentId);
    }
  }

  familyDetailsTableFormate(): void {
    this.studentFamily.forEach(data => {
      this.tableArrayFamilyDetails = [];
      this.tableArrayFamilyDetails.push(
        {
          col1: 'Relation:', col2: data.familyRelationName,
          col3: 'Title:', col4: data.title,
          col5: 'FirstName:', col6: data.firstName,
          col7: 'MiddleName:', col8: data.middleName
        },
        {
          col1: 'LastName:', col2: data.lastName,
          col3: 'DOB:', col4: data.dOB,
          col5: 'BloodGroup:', col6: data.bloodGroup,
          col7: 'PhoneNumber:', col8: data.phoneNumber
        },
        {
          col1: 'Email:', col2: data.email,
          col3: '', col4: '',
          col5: '', col6: '',
          col7: '', col8: ''
        }
      );
      this.tableArrayFamilyDetailsList.push(this.tableArrayFamilyDetails);
    });
  }
}