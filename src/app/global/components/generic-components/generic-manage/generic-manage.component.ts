import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { statusList } from 'src/app/shared/models/commons/selectItems';
import { HasPermissionPipe } from "../../../../shared/pipes/has-permission.pipe";
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-generic-manage',
  standalone: true,
  imports: [CommonModule, ToastModule, SelectModule, FormsModule, ReactiveFormsModule, ToolbarModule, TabsModule, PanelModule, ConfirmDialogModule, ButtonModule,
    InputTextModule, TextareaModule, TooltipModule, HasPermissionPipe],
  templateUrl: './generic-manage.component.html',
  styleUrl: './generic-manage.component.scss'
})
export class GenericManageComponent {
  @Input() componentName: string = 'Default';
  @Input() service: any;
  @Input() model: any = {};
  @Input() listRoute: string = '';
  @Input() viewRoute: string = '';
  @Input() manageRoute: string = '';
  @Input() iconClass: string = '';
  @Input() permissionPrefix: string = '';

  statusList: SelectItem[] = statusList;
  formGroup!: FormGroup;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof Scroll) {
        this.setIconClassBasedOnRoute(event.routerEvent.url);
      }
    });
  }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = Number.parseInt(idParam || '0');
      if (this.id > 0) {
        this.getById(this.id);
      }
    });
  }

  initializeFormGroup() {
    this.formGroup = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['PUBLISHED', Validators.required],
      createdBy: [''],
      modifiedBy: [''],
      createdDate: [''],
      modifiedDate: [''],
    });
  }

  getById(id: number) {
    this.service.getById(id).subscribe({
      next: (data: any) => {
        if (data) {
          this.formGroup.patchValue(data);
        }
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      },
    });
  }

  onSubmit() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.formGroup.value.id = this.id;
        this.model = { ...this.formGroup.value, modifiedDate: new Date(), createdDate: new Date() };
        this.service.add(this.model).subscribe({
          next: (res: any) => {
            const successMessage = this.id > 0 ? `${this.componentName} updated successfully.` : `${this.componentName} added successfully.`;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            this.router.navigateByUrl(`${this.manageRoute}/` + res.id);
            this.getById(this.id);
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  addNew() {
    this.router.navigateByUrl(`${this.manageRoute}/0`);
    this.initializeFormGroup();
  }

  goBack() {
    this.router.navigateByUrl(`${this.viewRoute}/${this.id}`);
  }

  goToList() {
    this.router.navigateByUrl(this.listRoute);
  }

  setIconClassBasedOnRoute(url: string) {
    if (url.includes('home/smallbizgurus')) {
      this.iconClass = 'fas fa-handshake';
    } else if (url.includes('home/cloudbytes')) {
      this.iconClass = 'fas fa-cloud';
    } else if (url.includes('home/dashboard')) {
      this.iconClass = 'fas fa-home';
    } else if (url.includes('home/bigleads')) {
      this.iconClass = 'fas fa-briefcase';
    } else if (url.includes('home/mindspark')) {
      this.iconClass = 'fas fa-brain';
    } else if (url.includes('home/knowledgestand')) {
      this.iconClass = 'fas fa-book-open';
    } else if (url.includes('home/finpro')) {
      this.iconClass = 'fas fa-indian-rupee-sign';
    } else if (url.includes('home/executiveedge')) {
      this.iconClass = 'fas fa-user-tie';
    } else if (url.includes('home/digitalfingers')) {
      this.iconClass = 'fas fa-user-gear';
    } else if (url.includes('home/timeclockplus')) {
      this.iconClass = 'fas fa-calendar-days';
    } else if (url.includes('home/virtuallearn')) {
      this.iconClass = 'fas fa-atlas';
    } else if (url.includes('home/inventorymatrix')) {
      this.iconClass = 'fas fa-warehouse';
    } else if (url.includes('home/faq')) {
      this.iconClass = 'fas fa-person-circle-question';
    } else {
      this.iconClass = 'fas fa-cog';
    }
  }
}