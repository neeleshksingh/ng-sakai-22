import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { ServiceRequest } from 'src/app/shared/models/students/service-request';
import { ServiceRequestAttachment } from 'src/app/shared/models/students/service-request-attachment';
import { ServiceRequestWorkflow } from 'src/app/shared/models/students/service-request-workflow';
import { ServiceRequestWorkflowService } from '../../services/service-request-workflow.service';
import { ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-service-request-view',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './service-request-view.component.html',
  styleUrl: './service-request-view.component.scss'
})
export class ServiceRequestViewComponent {

  componentName: string = ""
  serviceRequestReviewFormGroup!: FormGroup;
  serviceRequestWorkflowFormGroup!: FormGroup;
  serviceRequestReplyFormGroup!: FormGroup;
  serviceRequest: ServiceRequest = {};
  serviceRequestWorkflowList: ServiceRequestWorkflow[] = [];
  serviceRequestAttachmentList: ServiceRequestAttachment[] = [];
  serviceRequestWorkflow: ServiceRequestWorkflow = {};

  approveList: SelectItem[] = [];
  reviewList: SelectItem[] = [];
  departmentList: SelectItem[] = [];

  reviewDisabled: boolean = true;
  messageDialog: boolean = false;
  serviceRequestId: number = 0;
  userName: string = "";
  requestedForUserName: string = "";
  priority: string = "";
  isApprovalRequired: boolean = false;
  isInProgress: boolean = false;
  isAssigned: boolean = false
  isFileError: boolean = false;
  fileError: string = "";
  formData = new FormData();
  cols = [
    { icon: 'pi-tag', label: 'Department', key: 'serviceRequestDepartmentName' },
    { icon: 'pi-book', label: 'WorkGroup', key: 'serviceRequestWorkgroupName' },
    { icon: 'pi-align-left', label: 'Category', key: 'serviceRequestCategoryName' },
    { icon: 'pi-align-left', label: 'Sub Category', key: 'serviceRequestSubCategoryName' },
    { icon: 'pi-tag', label: 'Is Request For Other', key: 'isRequestedForOther' },
    { icon: 'pi-book', label: 'RequestFor', key: 'requestedForUserName' },
    { icon: 'pi-align-left', label: 'Priority', key: 'priority' },
    { icon: 'pi-align-left', label: 'Location', key: 'location' },
    { icon: 'pi-book', label: 'Contact Number', key: 'contactNumber' },
    { icon: 'pi-align-left', label: 'Extension Number', key: 'extensionNumber' },
    { icon: 'pi-align-left', label: 'Symptom', key: 'symptom' },
  ];

  private currentUserSubject!: BehaviorSubject<LoginResponse>;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private serviceRequestService: ServiceRequestService,
    private serviceRequestWorkflowService: ServiceRequestWorkflowService) { }

  ngOnInit(): void {
    this.messageDialog = false;
    this.isAssigned = false;
    this.isInProgress = false;
    this.initializeServiceRequestReviewFormGroup();
    this.initializeserviceRequestWorkflowFormGroup();
    this.initializeserviceRequestReplyFormGroup();
    var data = localStorage.getItem('currentUser');
    if (data) {
      const parsedData = JSON.parse(data);
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(parsedData);
      this.userName = this.currentUserSubject.value.applicationUser.userName ?? '';
    }
    // this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(currentUser));
    // this.userName = this.currentUserSubject.value['applicationUser'].userName;

    // this.approveList = [
    //   { label: 'APPROVE', value: 'APPROVE' },
    //   { label: 'REJECT', value: 'REJECT' }
    // ];

    // this.reviewList = [
    //   { label: 'COMPLETE', value: 'COMPLETE' },
    //   { label: 'CLOSED', value: 'CLOSED' }
    // ];

    // this.departmentList = [
    //   { label: 'CloudBytes', value: 'CloudBytes' },
    //   { label: 'MindSpark', value: 'MindSpark' },
    //   { label: 'FinPro', value: 'FinPro' },
    //   { label: 'SmallBizGurus', value: 'SmallBizGurus' }
    // ];

    this.route.paramMap.subscribe(params => {
      this.serviceRequestId = Number.parseInt(params.get('id') ?? '0');
      if (this.serviceRequestId > 0) {
        this.getServiceRequestById(this.serviceRequestId);
      }
    });
  }
  getServiceRequestWorkFlowByServiceRequestId() {
    this.serviceRequestWorkflowService.getServiceRequestWorkFlowByServiceRequestId(this.serviceRequestId).subscribe(response => {
      this.serviceRequestWorkflowList = response;
      if (this.serviceRequestWorkflowList.filter((x: any) => x.status.toUpperCase() == 'ASSIGNED')) {
        this.isAssigned = true;
      }
      if (this.serviceRequestWorkflowList.filter((x: any) => x.status.toUpperCase() == 'IN PROGRESS')) {
        this.isInProgress = true;
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error - Service request workflow not found', detail: err.error.message, life: 3000 });
    });
  }
  getServiceRequestById(serviceRequestId: number) {
    this.serviceRequestService.getServiceRequestById(serviceRequestId).subscribe(response => {
      this.serviceRequest = response;
      this.requestedForUserName = response.requestedForId ?? "";
      this.priority = response.priority ?? "";
      this.isApprovalRequired = response.isApprovalRequired ?? false;
      this.serviceRequestReviewFormGroup.patchValue({
        serviceRequestDepartmentName: response?.serviceRequestDepartmentName,
        serviceRequestWorkgroupName: response?.serviceRequestWorkgroupName,
        serviceRequestCategoryName: response?.serviceRequestCategoryName,
        serviceRequestSubCategoryName: response?.serviceRequestSubCategoryName,
        isRequestedForOther: response?.isRequestedForOther == true ? 'YES' : 'SELF',
        requestedForUserName: response?.requestedForId,
        priority: response?.priority,
        location: response?.location,
        contactNumber: response?.contactNumber,
        extensionNumber: response?.extensionNumber,
        title: response?.title,
        symptom: response?.symptom,
        review: response?.approvalReview,
        assignTo: response?.assignTo,
        reviewComment: response?.reviewComment,
        isApprovalRequired: response?.isApprovalRequired,
        createdBy: response?.createdBy,
        createdDate: response?.createdDate,
        modifiedBy: response?.modifiedBy,
        modifiedDate: response?.modifiedDate,
      });
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'your request has been fetched successfully.' });
      this.getServiceRequestWorkFlowByServiceRequestId();
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error - Service request not found', detail: err.error.message, life: 3000 });
    });
  }
  // submitReview() {
  //   if (this.isInProgress) {
  //     this.serviceRequestWorkflow = {};
  //     this.serviceRequestWorkflow.serviceRequestId = this.serviceRequestId;
  //     this.serviceRequestWorkflow.status = "IN PROGRESS";
  //     this.serviceRequestWorkflow.userName = this.userName;
  //     this.serviceRequestWorkflow.visibleToRequestor = true;
  //     this.serviceRequestWorkflow.resolutionMessage = "In progress by " + this.userName;
  //     this.addServiceRequestWorkflow();
  //   }
  //   if (this.serviceRequestWorkflowFormGroup.value.review) {
  //     this.serviceRequestWorkflow = {};
  //     this.serviceRequestWorkflow.serviceRequestId = this.serviceRequestId
  //     this.serviceRequestWorkflow.status = this.serviceRequestWorkflowFormGroup.value.review;
  //     this.serviceRequestWorkflow.userName = this.userName;
  //     this.serviceRequestWorkflow.visibleToRequestor = this.serviceRequestWorkflowFormGroup.value.visibleToRequestor;
  //     this.serviceRequestWorkflow.resolutionMessage = this.serviceRequestWorkflowFormGroup.value.reviewComment;
  //     this.addServiceRequestWorkflow();
  //   }
  //   if (this.serviceRequestWorkflowFormGroup.value.approvalReview) {
  //     this.serviceRequestWorkflow = {};
  //     this.serviceRequestWorkflow.serviceRequestId = this.serviceRequestId;
  //     if (this.serviceRequestWorkflowFormGroup.value.approvalReview.toUpperCase() == "APPROVE") {
  //       this.serviceRequestWorkflow.status = "PENDING";
  //     } else {
  //       this.serviceRequestWorkflow.status = "CLOSED";
  //     }
  //     this.serviceRequestWorkflow.userName = this.userName;
  //     this.serviceRequestWorkflow.visibleToRequestor = true;
  //     this.serviceRequestWorkflow.resolutionMessage = this.serviceRequestWorkflowFormGroup.value.reviewComment;
  //     this.addServiceRequestWorkflow();
  //   }
  // }
  addServiceRequestWorkflow(serviceRequestWorkflowdata: ServiceRequestWorkflow) {
    this.serviceRequestWorkflowService.addServiceRequestWorkFlow(serviceRequestWorkflowdata).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'your request has been updated successfully.' });
      this.getServiceRequestWorkFlowByServiceRequestId();
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'service request not updated', detail: err.error.message, life: 3000 });
    });
  }
  // onApproveChange(event) {
  //   this.serviceRequestReviewFormGroup.value.approvalReview = event.value;
  //   const reviewCommentRequired = <FormControl>this.serviceRequestReviewFormGroup.get('approvalReview');
  //   const requestedForId = <FormControl>this.serviceRequestReviewFormGroup.get('reviewComment');
  //   if (reviewCommentRequired.value == 'Reject') {
  //     requestedForId.setValidators([Validators.required]);
  //     this.serviceRequest.approvalReview = 'Reject';
  //     this.messageDialog = true;
  //   } else {
  //     this.messageDialog = false;
  //     this.serviceRequest.approvalReview = 'Approve';
  //     requestedForId.setValidators(null);
  //   }
  //   requestedForId.updateValueAndValidity();
  // }
  // assignedToMe() {
  //   this.serviceRequestWorkflow = {};
  //   this.serviceRequestWorkflow.serviceRequestId = this.serviceRequestId;
  //   this.serviceRequestWorkflow.status = "ASSIGNED";
  //   this.serviceRequestWorkflow.userName = this.userName;
  //   this.serviceRequestWorkflow.visibleToRequestor = true;
  //   this.serviceRequestWorkflow.resolutionMessage = "Assigned to ." + this.userName;
  //   this.serviceRequestWorkflowService.addServiceRequestWorkFlow(this.serviceRequestWorkflow).subscribe(workFlowResponse => {
  //     this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Service request assigned to me.' });
  //   }, err => {
  //     this.messageService.add({ severity: 'error', summary: 'Error - Service request workflow has not been created.', detail: err.error.message, life: 3000 });
  //   });
  //   this.reviewDisabled = false;
  // }
  onTabChange(event: any) {
    var index = typeof event === 'object' && event !== null && 'index' in event ? event.index : Number(event);

    switch (index) {
      case 0: {
        break;
      }
      case 1: {
        this.getServiceRequestAttachmentByServiceRequestId();
        break;
      }
      case 2: {
        this.getServiceRequestWorkFlowByServiceRequestId();
        break;
      }
      case 3: {

        break;
      }
      case 4: {
        //statements; 
        break;
      }
      case 5: {
        //statements; 
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }
  initializeServiceRequestReviewFormGroup() {
    this.serviceRequestReviewFormGroup = this.fb.group({
      id: 0,
      serviceRequestDepartmentName: [''],
      serviceRequestWorkgroupName: [''],
      serviceRequestCategoryName: [''],
      serviceRequestSubCategoryName: [''],
      serviceCategory: [''],
      isRequestedForOther: [''],
      requestedForUserName: [''],
      city: [''],
      symptom: [''],
      approvalReview: [''],
      review: [''],
      assignTo: [''],
      reviewComment: [''],
      priority: [''],
      location: [''],
      contactNumber: [''],
      extensionNumber: [''],
      createdBy: [''],
      createdByName: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedByName: [''],
      modifiedDate: [''],
      isApprovalRequired: []
    });
  }
  initializeserviceRequestWorkflowFormGroup() {
    this.serviceRequestWorkflowFormGroup = this.fb.group({
      id: 0,
      approvalReview: [],
      review: [],
      assignTo: [],
      reviewComment: ['', Validators.required],
      visibleToRequestor: [false],
    });
  }
  initializeserviceRequestReplyFormGroup() {
    this.serviceRequestReplyFormGroup = this.fb.group({
      id: 0,
      replyMessage: ['', Validators.required]
    });
  }
  getServiceRequestAttachmentByServiceRequestId() {
    if (this.serviceRequestAttachmentList.length == 0) {
      this.serviceRequestService.getServiceRequestAttachmentByServiceRequestId(this.serviceRequestId).subscribe(response => {
        this.serviceRequestAttachmentList = response;
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error - Service request attachment not found', detail: err.error.message, life: 3000 });
      });
    }
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
  SubmitReply() {
    this.serviceRequestWorkflow = {};
    this.serviceRequestWorkflow.serviceRequestId = this.serviceRequestId;
    this.serviceRequestWorkflow.status = "IN PROGRESS";
    this.serviceRequestWorkflow.userName = this.serviceRequest.userName;
    this.serviceRequestWorkflow.resolutionMessage = this.serviceRequestReplyFormGroup.value.replyMessage;
    this.addServiceRequestWorkflow(this.serviceRequestWorkflow);
    if (this.formData) {
      this.serviceRequestService.uploadAttachmentsByServiceRequestId(this.serviceRequestId, this.formData).subscribe(uploadDocumentResponse => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Document submitted successfully.' });

        this.serviceRequestWorkflow = {};
        this.serviceRequestWorkflow.serviceRequestId = this.serviceRequestId;
        this.serviceRequestWorkflow.status = "IN PROGRESS";
        this.serviceRequestWorkflow.userName = this.serviceRequest.userName;
        this.serviceRequestWorkflow.resolutionMessage = "Requested document uploaded successfully.";
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error - Document upload', detail: err.error.message, life: 3000 });
      });
    }
  }
  // onVisibleToRequestor(event) {
  //   if (event) {
  //     this.serviceRequestWorkflowFormGroup.value.visibleToRequestor = event?.checked;
  //   }
  // }
}
