import { Component, OnInit } from '@angular/core';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { StudentProgramService } from '../../../services/mindspark/student-program.service';

@Component({
  selector: 'app-student-program',
  standalone: false,
  templateUrl: './student-program.component.html',
  styleUrl: './student-program.component.scss'
})
export class StudentProgramComponent implements OnInit {
  studentProgram: StudentProgram[] = [];
  tableArrayStudentProgramsList: any[] = [];

  constructor(private studentProgramService: StudentProgramService) { }

  ngOnInit(): void {
    this.studentProgramService.studentProgram.subscribe(response => {
      this.studentProgram = response;
      if (this.studentProgram?.length > 0) {
        this.programDetailsTableFormate();
      }
    });
  }
  programDetailsTableFormate() {
    this.studentProgram = this.studentProgram.filter(x => x.isCurrentOperationalVertical == true);
    this.studentProgram.forEach(p => {
      this.tableArrayStudentProgramsList = [];
      this.tableArrayStudentProgramsList.push(
        { col1: 'AcademicSession:', col2: p.academicSessionName, col3: 'RegistrationNumber:', col4: p.registrationNumber },
        { col1: 'Program:', col2: p.programName, col3: 'CurrentSemester:', col4: p.operationalVerticalName },
      )
    });
  }
}
