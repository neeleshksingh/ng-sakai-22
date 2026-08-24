import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/models/bigleads/student';
import { StudentService } from '../../../services/big-leads/student.service';
import { StudentStatusService } from '../../../services/mindspark/student-status.service';

@Component({
  selector: 'app-student-basic-information',
  standalone: false,
  templateUrl: './student-basic-information.component.html',
  styleUrl: './student-basic-information.component.scss'
})
export class StudentBasicInformationComponent implements OnInit {

  student: Student = {};
  key = 'studentIdAndImage';

  constructor(private globalService: StudentService,
    private studentStatusService: StudentStatusService) { }

  ngOnInit(): void {
    this.globalService.student.subscribe(response => {
      if (response) {
        this.student = response;
      }
      if (this.student?.id) {
        this.student.studentFullName = this.student?.firstName + ' ' + this.student?.middleName + ' ' + this.student?.lastName;
        if (this.student?.identityImagePath) {
          this.student.identityImagePath = this.student?.identityImagePath.replace("\\", "/");
        } else {
          this.student.identityImagePath = './../assets/layout/images/icon-profile.png';
        }
        if (this.student?.studentId) {
          this.addStudentIdAndImageSession(this.student?.studentId, this.student.identityImagePath);
        }
        this.getStudentStatus();
      }
    });
  }

  addStudentIdAndImageSession(studentId: string, imageUrl: string): void {
    const students = this.getStudentsIdAndImageSession();
    const exists = students.some(student => student.studentId === studentId);
    if (exists) {
      return; // Do not add duplicate
    }
    if (students.length >= 3) students.shift(); // Remove oldest item if limit reached
    students.push({ studentId, imageUrl: imageUrl }); // Add new student
    sessionStorage.setItem(this.key, JSON.stringify(students));
  }

  getStudentsIdAndImageSession(): { studentId: string; imageUrl: string }[] {
    return JSON.parse(sessionStorage.getItem(this.key) || '[]');
  }
  getStudentStatus() {
    const rusticatedIds = ['SBU234255', 'SBU234179', 'SBU232088', 'SBU233121'];
    this.studentStatusService.getByStudentId(this.student?.studentId || '').subscribe(response => {
      if (rusticatedIds.includes(this.student?.studentId || '')) {
        this.student.statusDescription = 'RUSTICATED';
      } else if (response?.length > 0) {
        this.student.statusDescription = response[0].studentStatusDescriptionName.toUpperCase();
      } else {
        this.student.statusDescription = 'ACTIVE';
      }
    });
  }
}
