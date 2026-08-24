import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { ServiceRequest } from 'src/app/shared/models/students/service-request';
import { ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-service-request-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './service-request-list.component.html',
  styleUrl: './service-request-list.component.scss'
})
export class ServiceRequestListComponent {

  componentName: string = "Service Request List";
  @ViewChild('searchInput', { static: false }) searchInput: any;
  private currentUserSubject!: BehaviorSubject<LoginResponse>;
  studentId: string = "";
  serviceRequestList: ServiceRequest[] = [];

  cols = [
    { field: 'serviceRequestDepartmentName', header: 'Department', filterType: 'text' },
    { field: 'serviceRequestWorkgroupName', header: 'Workgroup', filterType: 'text' },
    { field: 'serviceRequestCategoryName', header: 'Category', filterType: 'text' },
    { field: 'serviceRequestSubCategoryName', header: 'Sub Category', filterType: 'text' },
    { field: 'workflowStatus', header: 'Status', filterType: 'text' },
    { field: 'location', header: 'Location', filterType: 'text' }
  ];

  globalFilterFields = this.cols.map(col => col.field);

  actions = [
    {
      name: 'view',
      icon: 'pi pi-eye',
      tooltip: 'View'
    }
  ];
  dataKey = 'id';
  isLoading: boolean = true;
  skeletonValue: number[] = Array(4).fill(1);
  selectedServiceRequest: ServiceRequest[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private serviceRequestService: ServiceRequestService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    var data = localStorage.getItem('currentUser');
    if (data) {
      const parsedData = JSON.parse(data);
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(parsedData);
      this.studentId = this.currentUserSubject.value.applicationUser.userName ?? '';
    }
    this.getServiceRequestByStudentId();
  }
  getServiceRequestByStudentId() {
    this.serviceRequestService.getServiceRequestByStudentId(this.studentId).subscribe(response => {
      this.isLoading = false;
      this.serviceRequestList = response;
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error - Document upload', detail: err.error.message, life: 3000 });
    });
  }
  editServiceRequest(serviceRequest: ServiceRequest) {
    this.router.navigateByUrl("/Home/Students/Helpshift/ServiceRequestReview/" + serviceRequest.id);
  }

  clear(table: Table) {
    table.clear();
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
  }

  handleAction(event: { action: string, data: any }) {
    if (event.action === 'view') {
      this.router.navigateByUrl(`/home/students/service-request-view/${event.data.id}`);
    }
  }
}
