import { Component, OnInit } from '@angular/core';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { StudentProgramService } from '../../../services/mindspark/student-program.service';

@Component({
  selector: 'app-student-bus-hostel-opt-in-opt-out',
  standalone: false,
  templateUrl: './student-bus-hostel-opt-in-opt-out.component.html',
  styleUrl: './student-bus-hostel-opt-in-opt-out.component.scss'
})
export class StudentBusHostelOptInOptOutComponent implements OnInit {
  studentProgramList: StudentProgram[] = [];

  constructor(private studentProgramService: StudentProgramService) { }
  ngOnInit(): void {
    this.studentProgramService.studentProgram.subscribe(response => {
      this.studentProgramList = response;
      if (this.studentProgramList?.length > 0) {
        this.studentProgramList.sort((a, b) =>
          (a.operationalVerticalId ?? 0) - (b.operationalVerticalId ?? 0)
        );
      }
    });
  }
}
