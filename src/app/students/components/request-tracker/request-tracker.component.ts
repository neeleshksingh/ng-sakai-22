import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/idp/services/authentication-service.service';
import { SharedModule } from '@/shared.module';
import { UpdateInformationResponce } from 'src/app/shared/models/students/student-profile-update-request';
import { CommonService } from '../../services/common.service';
import { StudentProfileUpdateRequestService } from '../../services/student-profile-update-request.service';

@Component({
  selector: 'app-request-tracker',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './request-tracker.component.html',
  styleUrl: './request-tracker.component.scss'
})
export class RequestTrackerComponent {

  componentName: string = "Request Tracker";
  studentId: string = "";
  updateInformationRequestList: UpdateInformationResponce[] = [];
  casteList: SelectItem[] = [];
  categoryList: SelectItem[] = [];
  religionList: SelectItem[] = [];
  isLoading: boolean = true;

  cols: any[] = [
    { header: 'Request Id', field: 'requestId', filterType: 'text' },
    { header: 'Date', field: 'createdDate', type: 'dateTime', filterType: 'text' },
    { header: 'Field Name', field: 'propertyName', filterType: 'text' },
    { header: 'Field Value', field: 'propertyValue', filterType: 'text' },
    { header: 'Document Type', field: 'documentType', filterType: 'text', },
    { header: 'Request Comment', field: 'comments', filterType: 'text', },
    { header: 'Status', field: 'status', filterType: 'text' },
    { header: 'Reviewer Comment', field: 'reviewerComments', filterType: 'text', },
  ];

  constructor(private studentProfileUpdateRequestService: StudentProfileUpdateRequestService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.studentId = this.authenticationService.currentUserValue.applicationUser.userName ?? "";
    this.getAllCasteList();
    this.getAllCasteCategoryList();
    this.getAllReligionList();
    this.getStudentInformationUpdateRequestByStudentId()
  }

  getStudentInformationUpdateRequestByStudentId() {
    if (this.studentId) {
      this.studentProfileUpdateRequestService.GetStudentInformationUpdateRequestByStudentId(this.studentId).subscribe(data => {
        if (data) {
          this.updateInformationRequestList = [];
          this.updateInformationRequestList = data;
          this.dataManipulation();
        }
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      });
    }
  }
  dataManipulation() {
    if (this.updateInformationRequestList) {
      for (var i = 0; i < this.updateInformationRequestList.length; i++) {
        if (this.updateInformationRequestList[i].propertyName == 'casteId' && this.casteList) {
          this.updateInformationRequestList[i].propertyValue = this.casteList.filter
            (x => x.value == this.updateInformationRequestList[i].propertyValue).map(function (a) { return a.label }).toString();
          this.updateInformationRequestList[i].propertyName = 'caste';
        }
        if (this.updateInformationRequestList[i].propertyName == 'casteCategoryId' && this.categoryList) {
          this.updateInformationRequestList[i].propertyValue = this.categoryList.filter
            (x => x.value == this.updateInformationRequestList[i].propertyValue).map(function (a) { return a.label }).toString();
          this.updateInformationRequestList[i].propertyName = 'casteCategory';
        }
        if (this.updateInformationRequestList[i].propertyName == 'religionId' && this.religionList) {
          this.updateInformationRequestList[i].propertyValue = this.religionList.filter
            (x => x.value == this.updateInformationRequestList[i].propertyValue).map(function (a) { return a.label }).toString();
          this.updateInformationRequestList[i].propertyName = 'religion';
        }
        if (this.updateInformationRequestList[i].propertyName === 'dob' && this.religionList) {
          this.updateInformationRequestList[i].propertyValue =
            this.datepipe.transform(this.updateInformationRequestList[i].propertyValue, 'd-MMM-y') ?? undefined;
        }
      }
    }
    this.isLoading = false;
  }
  getAllCasteList() {
    this.commonService.getAllCaste().subscribe(data => {
      if (data) {
        this.casteList = [];
        data.forEach(x => {
          this.casteList.push({
            label: x.name,
            value: x.id
          })
        });
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });
  }
  getAllCasteCategoryList() {
    this.commonService.getAllCasteCategory().subscribe(data => {
      if (data) {
        this.categoryList = [];
        data.forEach(x => {
          this.categoryList.push({
            label: x.name,
            value: x.id
          })
        });
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });
  }
  getAllReligionList() {
    this.commonService.getAllReligion().subscribe(data => {
      if (data) {
        this.religionList = [];
        data.forEach(x => {
          this.religionList.push({
            label: x.name,
            value: x.id
          })
        });
      }
    });
  }
}
