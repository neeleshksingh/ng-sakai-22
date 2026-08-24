import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StudentProgramService } from 'src/app/global/services/mindspark/student-program.service';
import { SharedModule } from '@/shared.module';
import { Student } from 'src/app/shared/models/bigleads/student';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { StudentService } from '../../../services/big-leads/student.service';
import { StudentStatusService } from '../../../services/mindspark/student-status.service';

@Component({
  selector: 'app-student-basic-information',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-basic-information.component.html',
  styleUrl: './student-basic-information.component.scss'
})
export class StudentBasicInformationComponent implements OnInit, OnDestroy {
  student: Student = {};
  key = 'studentIdAndImage';
  @Input() studentId!: string;
  studentProgram: StudentProgram[] = [];
  isABCIDVerified: boolean = false;
  private routeSub: Subscription | undefined;
  private previousStudentId: string = '';

  constructor(
    private globalService: StudentService,
    private studentStatusService: StudentStatusService,
    private studentProgramService: StudentProgramService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev.get('studentId') === curr.get('studentId'))
    ).subscribe(params => {
      const newStudentId = params.get('studentId') || this.studentId;
      if (newStudentId && newStudentId !== this.previousStudentId) {
        this.clearSessionStorage();
        this.studentId = newStudentId;
        this.previousStudentId = newStudentId;
        const cachedData = this.getCachedData(newStudentId);
        this.getCachedStudentProgramData(this.studentId);
        if (cachedData) {
          this.student = cachedData.student;
          this.studentProgram = cachedData.studentProgram;
          if (this.student?.studentId && this.student?.studentImageUrl) {
            this.addStudentIdAndImageSession(this.student.studentId, this.student.studentImageUrl, this.student.studentFullName ?? '');
          }

        } else {
          this.loadStudentData(newStudentId);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private getCachedData(studentId: string): { student: Student, studentProgram: StudentProgram[] } | null {
    const cachedStudent = sessionStorage.getItem(`basic_student_${studentId}`);
    const cachedProgram = sessionStorage.getItem(`basic_studentProgram_${studentId}`);
    if (cachedStudent && cachedProgram) {
      try {
        return {
          student: JSON.parse(cachedStudent) as Student,
          studentProgram: JSON.parse(cachedProgram) as StudentProgram[]
        };
      } catch (e) {
        console.error('Error parsing cached basic info data:', e);
        return null;
      }
    }
    return null;
  }

  private saveCachedData(studentId: string, student: Student, studentProgram: StudentProgram[]) {
    try {
      sessionStorage.setItem(`basic_student_${studentId}`, JSON.stringify(student));
      sessionStorage.setItem(`basic_studentProgram_${studentId}`, JSON.stringify(studentProgram));
    } catch (e) {
      console.error('Error saving basic info to sessionStorage:', e);
    }
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`basic_student_${this.previousStudentId}`);
      sessionStorage.removeItem(`basic_studentProgram_${this.previousStudentId}`);
    }
  }

  private loadStudentData(studentId: string): void {
    this.globalService.GetByStudentId(studentId).subscribe((response) => {
      if (response) {
        this.student = response;
        if (this.student?.id) {
          this.student.studentFullName = `${this.student?.firstName || ''} ${this.student?.middleName || ''} ${this.student?.lastName || ''}`.trim();
          if (this.student?.studentImageUrl) {
            this.student.studentImageUrl = this.student.studentImageUrl.replace(/\\/g, '/');
          } else {
            const gender = this.student?.gender?.toLowerCase();
            this.student.studentImageUrl = gender === 'female'
              ? '../../../../../assets/images/female-user.svg'
              : '../../../../../assets/images/male-user.svg';
          }
          if (this.student?.studentId && this.student?.studentImageUrl) {
            this.addStudentIdAndImageSession(this.student.studentId, this.student.studentImageUrl, this.student.studentFullName);
          }
          this.getStudentStatus(studentId);
          this.getStudentProgramDetailsByStudentId(studentId);
        }
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });
  }

  addStudentIdAndImageSession(studentId: string, imageUrl: string, studentName: string): void {
    const students = this.getStudentsIdAndImageSession();
    const exists = students.some((student) => student.studentId === studentId);
    if (exists) {
      return;
    }
    if (students.length >= 3) students.shift();
    students.push({ studentId, imageUrl, studentName });
    sessionStorage.setItem(this.key, JSON.stringify(students));
  }

  getStudentsIdAndImageSession(): { studentId: string; imageUrl: string; studentName: string }[] {
    return JSON.parse(sessionStorage.getItem(this.key) || '[]');
  }

  getStudentStatus(studentId: string): void {
    const rusticatedIds = ['SBU234255', 'SBU234179', 'SBU232088', 'SBU233121'];
    this.studentStatusService.getByStudentId(studentId).subscribe((response) => {
      if (rusticatedIds.includes(this.student?.studentId || '')) {
        this.student.statusDescription = 'RUSTICATED';
      } else if (response?.length > 0) {
        this.student.statusDescription = response[0].studentStatusDescriptionName.toUpperCase();
      } else {
        this.student.statusDescription = 'ACTIVE';
      }
      this.saveCachedData(studentId, this.student, this.studentProgram);
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });
  }

  getStudentProgramDetailsByStudentId(studentId: string): void {
    this.studentProgramService.getByStudentId(studentId).subscribe({
      next: (data) => {
        this.studentProgram = data.filter((x) => x.isCurrentOperationalVertical == true);
        this.saveCachedData(studentId, this.student, this.studentProgram);
      }, error: error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
  }

  getCachedStudentProgramData(studentId: string) {
    const cachedProgramData = sessionStorage.getItem(`basic_studentProgram_${studentId}`);
    if (cachedProgramData) {
      const programData = JSON.parse(cachedProgramData);
      this.isABCIDVerified = programData.isABCIDVerified;
    }
  }
}