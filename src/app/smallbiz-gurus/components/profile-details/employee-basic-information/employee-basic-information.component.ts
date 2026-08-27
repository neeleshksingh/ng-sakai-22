import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeUploadPhoto } from 'src/app/shared/models/smallbizgurus/employee-upload-photo';
import { EmployeeDetailsService } from 'src/app/smallbiz-gurus/services/employee-details.service';

@Component({
  selector: 'app-employee-basic-information',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './employee-basic-information.component.html',
  styleUrl: './employee-basic-information.component.scss'
})
export class EmployeeBasicInformationComponent implements OnInit {
  profileImageUrl: string = '';
  currentUser: any;
  userbasicInfo: any = {};
  employeeFormGroup: FormGroup = new FormGroup({});
  displayImage: string = 'assets/images/default-pic.jpg';
  formData = new FormData();
  data: EmployeeUploadPhoto = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private employeeDetailsService: EmployeeDetailsService,
    public layoutService: LayoutService
  ) { }

  ngOnInit() {
    const user: any = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(user) || [];
    const data = this.currentUser.applicationUser;

    if (data?.uniqueUserCode) {
      this.employeeDetailsService.getByEmployeeCode(data.uniqueUserCode).subscribe({
        next: (response) => {
          if (response) {
            this.userbasicInfo = response;
            this.userbasicInfo.roles = data.roles.join(', ');
            this.userbasicInfo.email = data.email;
            this.userbasicInfo.firstName = data.firstName;
            this.userbasicInfo.lastName = data.lastName;
            this.profileImageUrl = data.employeePhotoUrl || this.profileImageUrl;
            this.displayImage = this.profileImageUrl;
            this.getEmployeeDetailsByEmployeeCode(this.userbasicInfo.employeeCode);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Employee not found for email id ' + data.email, life: 3000 });
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Failed to fetch employee details', life: 3000 });
        }
      });
    }

    this.initializeFormGroup();
    this.employeeFormGroup.patchValue({ employeeCode: this.userbasicInfo.employeeCode });
  }

  initializeFormGroup() {
    this.employeeFormGroup = this.fb.group({
      id: [0],
      employeeCode: ['', Validators.required],
    });
  }

  triggerFileInput() {
    const fileInput: HTMLInputElement = document.querySelector('#fileInput')!;
    fileInput.click();
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.split('/')[0] === 'image' && file.name.toLowerCase().endsWith('.jpg')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.displayImage = e.target.result; // Immediate preview
          this.formData.append('file[]', file);
          const imageUpload: EmployeeUploadPhoto = {
            employeeCode: this.userbasicInfo.employeeCode
          };
          this.employeeDetailsService.uploadEmployeePhotoUrlByEmployeeCode(imageUpload, this.formData)
            .then((res) => {
              this.data = res;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image uploaded successfully.', life: 3000 });
              this.getEmployeeDetailsByEmployeeCode(this.userbasicInfo.employeeCode);
            })
            .catch((err) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Failed to upload image', life: 3000 });
              this.displayImage = this.profileImageUrl; // Revert to previous image on failure
            });
          this.formData.delete('file[]');
        };
        reader.readAsDataURL(file);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please upload a .jpg image file.', life: 3000 });
      }
    }
  }

  getEmployeeDetailsByEmployeeCode(employeeCode: string) {
    this.employeeDetailsService.getByEmployeeCode(employeeCode).subscribe({
      next: (data) => {
        if (data && data.employeePhotoUrl) {
          this.displayImage = data.employeePhotoUrl;
          this.profileImageUrl = data.employeePhotoUrl;
        } else {
          this.displayImage = 'assets/images/default-pic.jpg';
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Failed to fetch employee details', life: 3000 });
      }
    });
  }

  get colorScheme(): string {
    return this.layoutService.isDarkTheme() ? 'dark' : 'light';
  }

  getSeverity(role: any): any {
    switch (role.toLowerCase()) {
      case 'developers':
        return 'success';
      case 'administration':
        return 'warning';
      case 'academics':
        return 'info';
      case 'timeclockplus':
        return 'danger';
      default:
        return 'info';
    }
  }
}