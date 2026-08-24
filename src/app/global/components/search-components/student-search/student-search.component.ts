import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Student } from 'src/app/shared/models/bigleads/student';
import { StudentService } from '../../../services/big-leads/student.service';
import { PartnerAppSettingService } from '../../../services/developers/partner-app-settings.service';


@Component({
  selector: 'app-student-search',
  standalone: false,
  templateUrl: './student-search.component.html',
  styleUrl: './student-search.component.scss'
})
export class StudentSearchComponent implements OnInit {
  @Output() studentId: EventEmitter<string> = new EventEmitter<string>();
  @Input() currentModuleNameToSearchStudent: string = '';

  studentProfileSearchGroup!: FormGroup;
  studentGeneralDetails!: Student;
  studentIdPrefix!: string;
  activeIndex!: number;
  studentIdAndImageList: { studentId: string; imageUrl: string }[] = [];

  constructor(private fb: FormBuilder, private globalService: StudentService,
    private router: Router,
    private messageService: MessageService,
    private partnerAppSettingService: PartnerAppSettingService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.initializeFeeComponetFormGroup();
    this.loadStudentIdAndImage();
    this.route.paramMap.subscribe(params => {
      this.studentProfileSearchGroup.patchValue({ studentId: params.get('studentId') });
    });
    if (!this.studentProfileSearchGroup.value.studentId) {
      this.partnerAppSettingService.getByName("PartnerStudentIdPrefix").subscribe(response => {
        if (response[0]?.value) {
          this.studentIdPrefix = response[0].value;
          this.studentProfileSearchGroup.get('studentId')!.setValidators([Validators.required, studentPrefixValidator(this.studentIdPrefix)]);
          this.studentProfileSearchGroup.patchValue({ studentId: this.studentIdPrefix });
        } else
          this.studentIdPrefix = ''
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      })
    }

    // SBU210425, SBU221154
  }
  loadStudentIdAndImage() {
     this.studentIdAndImageList = JSON.parse(sessionStorage.getItem("studentIdAndImage") || '[]');
    return this.studentIdAndImageList;
  }
  onStudentIdAndImageClick(studentId: string){
    this.searchByStudentId(studentId);
  }
  initializeFeeComponetFormGroup() {
    this.studentProfileSearchGroup = this.fb.group({
      id: 0,
      studentId: ['', Validators.required]
    });
  }

  searchByStudentId(studentId: string) {
    this.studentId.emit(studentId);
    this.studentProfileSearchGroup.patchValue({ studentId: studentId });
    if (this.currentModuleNameToSearchStudent == "mindspark" 
      || this.currentModuleNameToSearchStudent == "finpro") {
      this.activeIndex = 1;
    }
    else if (this.currentModuleNameToSearchStudent == "knowledgestand") {
      this.activeIndex = 2;
    }
    else {
      this.activeIndex = 0;
    }
    this.router.navigateByUrl("/home/" + this.currentModuleNameToSearchStudent + "/reports/students/student-information/"
      + studentId + "/" + this.activeIndex);
  }
}
export function studentPrefixValidator(studentIdPrefix: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const studentPrefix = control.value == studentIdPrefix;
    return studentPrefix ? { studentPrefixInvalid: true } : null;
  };
}
