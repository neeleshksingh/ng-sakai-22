import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { ServiceRequest } from 'src/app/shared/models/students/service-request';
import { ServiceRequestWorkflow } from 'src/app/shared/models/students/service-request-workflow';
import { ServiceRequestCategoryService } from '../../services/service-request-category.service';
import { ServiceRequestDepartmentService } from '../../services/service-request-department.service';
import { ServiceRequestSubCategoryService } from '../../services/service-request-sub-category.service';
import { ServiceRequestWorkflowService } from '../../services/service-request-workflow.service';
import { ServiceRequestWorkgroupService } from '../../services/service-request-workgroup.service';
import { ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './service-request.component.html',
  styleUrl: './service-request.component.scss'
})
export class ServiceRequestComponent {

  componentName: string = "Create Service Request";
  serviceRequestFormGroup!: FormGroup;
  serviceRequest: ServiceRequest = {};
  serviceRequestWorkflow: ServiceRequestWorkflow = {};

  serviceRequestDepartmentLists: SelectItem[] = [];
  serviceRequestWorkgroupLists: SelectItem[] = [];
  serviceRequestCategoryLists: SelectItem[] = [];
  serviceRequestSubCategoryLists: SelectItem[] = [];
  isRequestForOtherLists: SelectItem[] = [];
  titleLists: SelectItem[] = [];
  routeLists: SelectItem[] = [];
  stoppageLists: SelectItem[] = [];
  hostelTypeLists: SelectItem[] = [];
  priorityLists: SelectItem[] = [];

  isFileError: boolean = false;
  fileError: string = "";
  formData = new FormData();
  serviceRequestId: number = 0;
  messageDialog: boolean = false;
  disableField: boolean = false;
  private currentUserSubject!: BehaviorSubject<LoginResponse>;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private serviceRequestDepartmentService: ServiceRequestDepartmentService,
    private serviceRequestWorkgroupService: ServiceRequestWorkgroupService,
    private serviceRequestCategoryService: ServiceRequestCategoryService,
    private serviceRequestSubCategoryService: ServiceRequestSubCategoryService,
    private serviceRequestService: ServiceRequestService,
    private serviceRequestWorkflowService: ServiceRequestWorkflowService
  ) { }

  ngOnInit(): void {
    this.initializeServiceRequestFormGroup();

    var data = localStorage.getItem('currentUser');
    if (data) {
      const parsedData = JSON.parse(data);
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(parsedData);
      this.serviceRequestFormGroup.patchValue({
        name: this.currentUserSubject.value['applicationUser'].firstName +
          ' ' + this.currentUserSubject.value['applicationUser'].middleName + ' ' +
          this.currentUserSubject.value['applicationUser'].lastName
      });
      this.disableField = true;
    }

    this.isRequestForOtherLists = [
      { label: 'YES', value: 'YES' },
      { label: 'NO', value: 'NO' },
    ];

    this.priorityLists = [
      { label: 'LOW', value: 'LOW' },
      { label: 'MEDIUM', value: 'NO' },
      { label: 'HIGH', value: 'HIGH' }
    ];
    this.titleLists = [
      { label: 'MR', value: 'MR' },
      { label: 'MRS', value: 'MRS' }
    ]

    this.getDepartmentList();
    this.messageDialog = false;
  }


  getDepartmentList() {
    this.serviceRequestDepartmentService.getServiceRequestDepartmentList().subscribe({
      next: (data) => {
        var filterData = data.filter((x: any) => x.status.toUpperCase() == "PUBLISHED");
        var lists = [];
        for (var i = 0; i < filterData.length; i++) {
          lists.push({ label: filterData[i].name, value: filterData[i].name });
        }
        this.serviceRequestDepartmentLists = filterData.map(item => ({ label: item.name, value: item.id }));
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  onServiceRequestDepartmentChanged(event: any) {
    this.serviceRequestFormGroup.value.serviceRequestDepartmentId = event.value;
    this.serviceRequestWorkgroupService.getByServiceRequestDepartmentId(event.value).subscribe({
      next: (data) => {
        var filterData = data.filter((x: any) => x.status.toUpperCase() == "PUBLISHED");
        var lists = [];
        for (var i = 0; i < filterData.length; i++) {
          lists.push({ label: filterData[i].name, value: filterData[i].name });
        }
        this.serviceRequestWorkgroupLists = filterData.map(item => ({ label: item.name, value: item.id }));
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })

  }
  onServiceRequestWorkgroupChanged(event: any) {
    this.serviceRequestFormGroup.value.serviceRequestWorkgroupId = event.value;
    this.serviceRequestCategoryService.getByServiceRequestWorkgroupId(event.value).subscribe({
      next: (data) => {
        var filterData = data.filter((x: any) => x.status.toUpperCase() == "PUBLISHED");
        var lists = [];
        for (var i = 0; i < filterData.length; i++) {
          lists.push({ label: filterData[i].name, value: filterData[i].name });
        }
        this.serviceRequestCategoryLists = filterData.map(item => ({ label: item.name, value: item.id }));
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }
  onServiceRequestCategoryChanged(event: any) {
    this.serviceRequestFormGroup.value.serviceRequestCategoryId = event.value;
    this.serviceRequestSubCategoryService.getByServiceRequestCategoryId(event.value).subscribe({
      next: (data) => {
        var filterData = data.filter((x: any) => x.status.toUpperCase() == "PUBLISHED");
        var lists = [];
        for (var i = 0; i < filterData.length; i++) {
          lists.push({ label: filterData[i].name, value: filterData[i].name });
        }
        this.serviceRequestSubCategoryLists = filterData.map(item => ({ label: item.name, value: item.id }));
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }
  onServiceRequestSubCategoryChanged(event: any) {
    this.serviceRequestFormGroup.value.serviceRequestSubCategoryId = event.value;
  }
  onIsRequestForOther(event: any) {
    this.serviceRequestFormGroup.value.isRequestedForOther = event.value;
    const isRequestedForOther = <FormControl>this.serviceRequestFormGroup.get('isRequestedForOther');
    const requestedForId = <FormControl>this.serviceRequestFormGroup.get('requestedForId');
    if (isRequestedForOther.value == 'YES') {
      requestedForId.setValidators([Validators.required]);
      this.messageDialog = true;
    } else {
      this.messageDialog = false;
      requestedForId.setValidators(null);
    }

    requestedForId.updateValueAndValidity();
  }
  documentUpload(event: any, fileUpload: any) {
    this.isFileError = false;
    this.fileError = '';
    const file = event.files[0];

    if (file.type !== 'application/pdf' || file.size > 10000000) {
      this.isFileError = true;
      if (file.type !== 'application/pdf') {
        this.fileError = "Please upload .pdf file format."
      }
      if (file.size > 10000000) {
        this.fileError = "File size should not be more than 1 MB";
      }
    }
    else {
      this.formData = new FormData;
      this.formData.append('formFile', file);
    }
    fileUpload.remove();
  }
  onRaiseRequestPaylod() {
    this.serviceRequest.serviceRequestDepartmentId = this.serviceRequestFormGroup.value.serviceRequestDepartmentId;
    this.serviceRequest.serviceRequestWorkgroupId = this.serviceRequestFormGroup.value.serviceRequestWorkgroupId;
    this.serviceRequest.serviceRequestCategoryId = this.serviceRequestFormGroup.value.serviceRequestCategoryId;
    this.serviceRequest.serviceRequestSubCategoryId = this.serviceRequestFormGroup.value.serviceRequestSubCategoryId;
    this.serviceRequest.IsRequestedForOther = this.serviceRequestFormGroup.value.isRequestedForOther == "YES" ? true : false;
    if (this.serviceRequestFormGroup.value.requestedForId == null) {
      this.serviceRequest.requestedForId = this.currentUserSubject.value['applicationUser'].userName;
    }
    // this.serviceRequest.requestedForId = this.serviceRequestFormGroup.value.requestedForId? 
    //                             this.currentUserSubject.value['applicationUser'].userName : this.serviceRequestFormGroup.value.requestedForId;
    this.serviceRequest.priority = this.serviceRequestFormGroup.value.priority;
    this.serviceRequest.location = this.serviceRequestFormGroup.value.location;
    this.serviceRequest.contactNumber = this.serviceRequestFormGroup.value.contactNumber;
    this.serviceRequest.extensionNumber = this.serviceRequestFormGroup.value.extensionNumber;
    this.serviceRequest.symptom = this.serviceRequestFormGroup.value.symptom;
    this.serviceRequest.name = this.serviceRequestFormGroup.value.name;
    this.serviceRequest.userName = this.currentUserSubject.value['applicationUser'].userName
    this.serviceRequest.requesterId = this.currentUserSubject.value['applicationUser'].userName;
    this.serviceRequest.requesterType = "STUDENT";
    this.serviceRequest.title = this.serviceRequestFormGroup.value.title;
  }
  raiseRequest() {
    this.onRaiseRequestPaylod();
    this.serviceRequestService.raiseServiceRequest(this.serviceRequest).subscribe({
      next: (data: any) => {
        this.serviceRequestService.uploadAttachmentsByServiceRequestId(data.id, this.formData).subscribe({
          next: (res) => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'your request has been submitted successfully.', life: 3000 });
            this.serviceRequestWorkflow.serviceRequestId = data.id;
            this.serviceRequestWorkflow.status = "OPEN";
            this.serviceRequestWorkflow.userName = this.serviceRequest.userName;
            this.serviceRequestWorkflow.tags = ""
            this.serviceRequestWorkflow.resolutionMessage = "Service request has been created.";
            this.serviceRequestWorkflowService.addServiceRequestWorkFlow(this.serviceRequestWorkflow).subscribe(workFlowResponse => {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Service request workflow has been created.' });
            }, err => {
              this.messageService.add({ severity: 'error', summary: 'Error - Service request workflow has not been created.', detail: err.error.message, life: 3000 });
            });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error - Document upload', detail: error.error.message, life: 3000 });
          }
        })
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }
  initializeServiceRequestFormGroup() {
    this.serviceRequestFormGroup = this.fb.group({
      id: 0,
      serviceRequestDepartmentId: ['', Validators.required],
      serviceRequestWorkgroupId: ['', Validators.required],
      serviceRequestCategoryId: ['', Validators.required],
      serviceRequestSubCategoryId: ['', Validators.required],
      serviceCategory: [''],
      isRequestedForOther: ['', Validators.required],
      name: ['', Validators.required],
      title: ['', Validators.required],
      requestedForId: [],
      symptom: ['', Validators.required],
      priority: [''],
      location: [''],
      contactNumber: [''],
      extensionNumber: [''],
      createdBy: [''],
      createdByName: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedByName: [''],
      modifiedDate: ['']
    });
  }
}
