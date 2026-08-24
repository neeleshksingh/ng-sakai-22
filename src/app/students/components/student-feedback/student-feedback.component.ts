import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { BatchFacultyFeedbackTrackingService } from '../../services/batch-faculty-feedback-tracking.service';
import { FeedbackQuestionServices } from '../../services/feedback-question.service';
import { StudentBatchTransferService } from '../../services/student-batch-transfer.service';
import { StudentFeedbackServices } from '../../services/student-feedback.service';
import { StudentProgramPaperCodeAllocationService } from '../../services/student-program-paper-code-allocation.service';
import { FeedbackSurveyPendingService } from 'src/app/shared/services/feedback-survey-pending.service';
import { StudentProgramService } from '../../services/student-program.service';
import { UserFeedbackSurveyTrackingStudentsService } from '../../services/user-feedback-survey-tracking.service';

@Component({
  selector: 'app-student-feedback',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-feedback.component.html',
  styleUrl: './student-feedback.component.scss'
})
export class StudentFeedbackComponent {

  componentName: string = "Batch-Faculty Feedback Form";
  studentFeedbackFormGroup!: FormGroup;
  studentRegistrationNumberList: any;
  operationalVerticalList: SelectItem[] = [];
  subjectPaperCodeFacultyList: any = [] = [];
  feedbackAnnouncementList: SelectItem[] = [];
  currentSemester: any[] = [];
  feedbackques: any[] = [];
  showTable: boolean = true;
  optionLabellength: number = 0;
  isSubmitted: boolean = false;
  submitDate: string = "";
  showLabel: boolean = true;
  disableViewBtn: boolean = true;
  subjectPaperCodeFaculty: string = "";
  studentRegNo: string = "";
  rowData: any;
  subjectPaperCodeId: number = 0;
  subjectPaperCodeName: string = "";
  subjectName: string = "";
  private subjectPaperCodeDataList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private studentFeedbackServices: StudentFeedbackServices,
    private StudentProgramService: StudentProgramService,
    private studentBatchTransferService: StudentBatchTransferService,
    private batchFacultyFeedbackTrackingService: BatchFacultyFeedbackTrackingService,
    private feedbackQuestionServices: FeedbackQuestionServices,
    private studentProgramPaperCodeAllocationService: StudentProgramPaperCodeAllocationService,
    private feedbackSurveyPendingService: FeedbackSurveyPendingService,
    private userFeedbackSurveyTrackingStudentsService: UserFeedbackSurveyTrackingStudentsService
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();

    this.studentFeedbackServices.getActiveFeedbackAnnouncement().subscribe({
      next: (data) => {
        if (data.length == 0) {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: "No Active Examination found for this student.", life: 3000 });
        }
        var filterData = data.filter((x: any) => x.status.toUpperCase() == "PUBLISHED");
        this.feedbackAnnouncementList = filterData.map((data: any) => ({ label: data.name, value: data.id }));
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  initializeFormGroup() {
    this.studentFeedbackFormGroup = this.fb.group({
      id: 0,
      studentRegistrationNumber: ['', Validators.required],
      feedbackAnnouncementId: ['', Validators.required],
      operationalVerticalId: ['', Validators.required],
      batchCode: ['', Validators.required],
      subjectPaperCodeId: [''],
      subjectPaperCodeName: [''],
      facultyCode: ['', Validators.required],
      feedbackSubmittedBy: [''],
      feedbackQuestionId: [''],
      rating: [''],
      status: "PUBLISHED",
      subjectPaperCodeFacultyList: ['', Validators.required],

      createdBy: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedDate: [''],
    });
  }

  onFeedbackAnnouncementChanged($event: any) {
    this.studentFeedbackFormGroup.patchValue({
      feedbackAnnouncementId: $event.value,
      studentRegistrationNumber: "",
      operationalVerticalId: "",
      batchCodeFacultyCodeList: ""
    });
    this.showTable = true;
    this.showLabel = true;
    this.isSubmitted = false;
    this.disableViewBtn = true;
    this.getStudentProgram();
  }
  getStudentProgram() {
    this.StudentProgramService.getStudentProgramList().subscribe({
      next: (data) => {

        const filterData = data.filter((x: any) => x.status.toUpperCase() == "PUBLISHED");
        const multipleRegNo = new Set();
        filterData.forEach((item) => {
          if (!multipleRegNo.has(item.registrationNumber)) {
            multipleRegNo.add(item.registrationNumber)
          }
        })

        const semesterList = [...multipleRegNo];
        this.studentRegistrationNumberList = semesterList.map(data => ({ label: data, value: data }));
        this.currentSemester = filterData.filter((x) => (x.isCurrentOperationalVertical === true));
        this.operationalVerticalList = this.currentSemester.map(data => ({ label: data.operationalVerticalName, value: data.operationalVerticalId }));

        if (this.currentSemester) {
          var previousSemester = filterData.filter(x => x.operationalVerticalId === this.currentSemester[0].operationalVerticalId - 1);
          if (previousSemester.length > 0) {
            this.operationalVerticalList.push({ label: previousSemester[0].operationalVerticalName, value: previousSemester[0].operationalVerticalId });
          }
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })

  }

  onChangeStudentRegistrationNumber($event: any) {
    // this.studentFeedbackFormGroup.addControl('batchCodeFacultyCodeList', new FormControl());
    // this.studentFeedbackFormGroup.patchValue({
    //   operationalVerticalId: this.currentSemester[0].operationalVerticalId,
    //   batchCodeFacultyCodeList: ""
    // });

    // this.studentBatchTransferService.getBatchCodeFacultyCode($event.value, this.currentSemester[0].operationalVerticalId).subscribe({
    //   next: (data) => {
    //     this.batchCodeFacultyCodeList = data.map((data: any) => ({ label: data.toBatchCode + "-" + data.facultyName, value: data.toBatchCode + " " + data.facultyCode }));
    //   },
    //   error: (error) => {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    //   }
    // })
  }

  onoperationalVerticalChanged($event: any) {
    this.disableViewBtn = true;
    this.studentProgramPaperCodeAllocationService.getByRegistrationNumber(this.studentFeedbackFormGroup.value.studentRegistrationNumber, $event.value).subscribe({
      next: (data: any) => {

        const filteredData = data.operationalVerticalSubjectResponseDataList
          .filter((item: any) => item.facultyName && item.facultyCode);
        this.subjectPaperCodeDataList = filteredData;
        this.subjectPaperCodeFacultyList = filteredData
          .map((data: any) => ({
            label: data.subjectPaperCodeName + "-" + data.facultyName,
            value: data.subjectPaperCodeId + " " + data.facultyCode
          }));
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  onSubjectPaperCodeFacultyCodeChanged($event: any) {
    const [subjectPaperCodeId, facultyCode] = $event.value.split(" ");
    const matched = this.subjectPaperCodeDataList.find(
      (item: any) => item.subjectPaperCodeId == subjectPaperCodeId && item.facultyCode == facultyCode
    );
    this.subjectPaperCodeName = matched?.subjectPaperCodeName || '';
    this.subjectName = matched?.subjectName || '';
    this.studentFeedbackFormGroup.patchValue({
      subjectPaperCodeId: parseInt(subjectPaperCodeId, 10),
      subjectPaperCodeName: this.subjectPaperCodeName,
      facultyCode: facultyCode,
    });

    this.showTable = true;
    const feedbackID = this.studentFeedbackFormGroup.value.feedbackAnnouncementId;
    const regNo = this.studentFeedbackFormGroup.value.studentRegistrationNumber;
    // const batchCode = this.studentFeedbackFormGroup.value.batchCode;
    if (!feedbackID && !regNo) {
      return this.messageService.add({ severity: 'warn', summary: 'warn', detail: "Unselected Feilds", life: 3000 });
    }
    this.batchFacultyFeedbackTrackingService.getTrackingByRegistrationNumber(regNo, subjectPaperCodeId).subscribe({
      next: (data) => {

        this.showLabel = true;
        this.disableViewBtn = false;
        if (data[0]?.isSubmitted) {
          this.isSubmitted = true;
          this.submitDate = data[0].createdDate;
          this.subjectPaperCodeId = subjectPaperCodeId;
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
    //   (data) => {
    //   this.showLabel = true;
    //   this.disableViewBtn = false;
    //   if (data?.isSubmitted) {
    //     this.submitBatchcode = data.batchCode;
    //     this.submitDate = data.createdDate;
    //   }
    // },
    //   (error) => {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    //   });

  }

  getFeedbackQuestions() {
    if (this.isSubmitted) {
      this.showLabel = false;
      this.isSubmitted = false;
      this.studentFeedbackFormGroup.patchValue({
        facultyCode: "",
        batchCode: "",
      });
      this.disableViewBtn = true;
      return;
    }
    const feedbackID = this.studentFeedbackFormGroup.value.feedbackAnnouncementId;
    this.feedbackQuestionServices.getByFeedbackAnnouncementId(feedbackID).subscribe((data) => {
      if (data) {
        let arr: any[] = [];
        let temp = 0;
        data.forEach((item: any) => {
          const label = item.optionLabels.split(",");
          const value = item.optionValues.split(",");
          let obj: { [key: string]: any } = {};
          obj = {
            question: item.name,
            questionId: item.id,
          };
          if (temp < value.length) {
            temp = Math.max(value.length, temp);
            this.optionLabellength = temp;
          }
          for (let i = 0; i < Math.min(label.length, value.length); i++) {
            obj['label' + (i + 1)] = label[i];
            obj['value' + (i + 1)] = value[i];
          }
          arr.push(obj);
        })
        this.feedbackques = arr;
        this.showTable = false;
      }
    },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      });
  }

  submitFeedback() {
    this.subjectPaperCodeFaculty = this.studentFeedbackFormGroup.value.subjectPaperCodeFacultyList;
    this.studentFeedbackFormGroup.patchValue({
      feedbackSubmittedBy: this.studentFeedbackFormGroup.value.studentRegistrationNumber,
    });

    this.studentRegNo = this.studentFeedbackFormGroup.value.studentRegistrationNumber
    this.studentFeedbackFormGroup.removeControl('studentRegistrationNumber');
    this.studentFeedbackFormGroup.removeControl('subjectPaperCodeFacultyList');
    this.studentFeedbackFormGroup.patchValue({
      createdDate: new Date(),
      modifiedDate: new Date(),
    });
    const payloadArr: any[] = [];
    let willSubmit = true;
    this.feedbackques.forEach((item) => {
      if (isNaN(item.rating)) {
        willSubmit = false;
      }
      this.studentFeedbackFormGroup.patchValue({
        feedbackQuestionId: item.questionId,
        rating: parseInt(item.rating),
      });
      payloadArr.push(this.studentFeedbackFormGroup.value);
    })
    if (willSubmit) {
      this.studentFeedbackServices.addBatchFacultyFeedback(payloadArr).subscribe((data) => {
        this.disableViewBtn = true;
        this.formModification();
        this.showTable = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Submitted Successfully", life: 3000 });
        this.userFeedbackSurveyTrackingStudentsService.getFeedbackSurveyTracking().subscribe({
          next: trackingData => { if (trackingData) this.feedbackSurveyPendingService.recheck(trackingData); },
          error: () => { }
        });
      },
        (error) => {
          this.formModification();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
        });

    } else {
      this.formModification();
      return this.messageService.add({ severity: 'warn', summary: 'warn', detail: "Unselected Feilds", life: 3000 });
    }

  }
  formModification() {
    this.studentFeedbackFormGroup.addControl('studentRegistrationNumber', new FormControl());
    this.studentFeedbackFormGroup.addControl('subjectPaperCodeFacultyList', new FormControl());
    this.studentFeedbackFormGroup.patchValue({
      subjectPaperCodeFacultyList: this.subjectPaperCodeFaculty,
      studentRegistrationNumber: this.studentRegNo,
    })
  }
  getDynamicLabels(feedback: any): string[] {
    const labels = [];
    for (let i = 1; i <= this.optionLabellength; i++) {
      if (feedback['label' + i]) {
        labels.push(feedback['label' + i]);
      }
    }
    return labels;
  }
  getDynamicValue(feedback: any, index: number): string {
    return feedback['value' + (index + 1)];
  }

  // Return contextual classes for a rating cell so the selected option is color-coded
  getCellClasses(feedback: any, i: number, rowIndex: number): any {
    const selected = this.feedbackques?.[rowIndex]?.rating;
    const optionValue = this.getDynamicValue(feedback, i);
    const isSelected = selected == optionValue; // handle string/number equality

    if (!isSelected) {
      return {};
    }

    const labels = this.getDynamicLabels(feedback);
    const rawLabel = (labels?.[i] || '').toString();
    const label = rawLabel.toLowerCase().trim();

    // Use regex with word boundaries to avoid 'agree' matching inside 'disagree'
    const match = (pattern: RegExp) => pattern.test(label);

    // Check disagree variants first to avoid substring collision
    if (match(/\bstrongly\s+disagree\b/)) return 'rating-strongly-disagree';
    if (match(/\bdisagree\b/)) return 'rating-disagree';
    if (match(/\bstrongly\s+agree\b/)) return 'rating-strongly-agree';
    if (match(/\bagree\b/)) return 'rating-agree';
    if (match(/\b(neutral|neither|no\s+opinion)\b/)) return 'rating-neutral';

    // Fallback to numeric value ordering when labels aren't standard
    const valueNum = Number(optionValue);
    const max = this.optionLabellength || 5;
    if (!isNaN(valueNum)) {
      if (valueNum === max) return 'rating-strongly-agree';
      if (valueNum === max - 1) return 'rating-agree';
      if (valueNum === Math.ceil(max / 2)) return 'rating-neutral';
      if (valueNum === 1) return 'rating-strongly-disagree';
      return 'rating-disagree';
    }

    return 'rating-selected';
  }
}
