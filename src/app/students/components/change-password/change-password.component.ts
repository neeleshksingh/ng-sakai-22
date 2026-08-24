import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { ChangePassword } from 'src/app/shared/models/students/change-password';
import { ChangePasswordService } from '../../services/change-password.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordFormGroup!: FormGroup;
  changePassword!: ChangePassword;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private changePasswordService: ChangePasswordService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initializeChangePasswordFormGroup();
  }
  initializeChangePasswordFormGroup() {
    this.changePasswordFormGroup = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6}.*$/)],
      confirmPassword: ['', Validators.required],
    }, { validator: ChangePasswordComponent.MatchPassword });
  }
  static MatchPassword(control: AbstractControl): ValidationErrors | null {
    const newPasswordControl = control.get('newPassword');
    const confirmPasswordControl = control.get('confirmPassword');

    // Ensure both controls exist before proceeding
    if (!newPasswordControl || !confirmPasswordControl) {
      return null;
    }

    const newPasswordValue = newPasswordControl.value;
    const confirmPasswordValue = confirmPasswordControl.value;

    // Check if passwords match
    if (newPasswordValue !== confirmPasswordValue) {
      confirmPasswordControl.setErrors({ ConfirmPassword: true });
    } else {
      // Clear errors if they exist
      if (confirmPasswordControl.hasError('ConfirmPassword')) {
        confirmPasswordControl.setErrors(null);
      }
    }

    return null;
  }
  onSubmit() {
    this.loading = true;
    var formData = { ...this.changePasswordFormGroup.value };
    if (formData.newPassword === formData.confirmPassword) {
      var changePassword = {
        password: formData.oldPassword,
        newPassword: formData.newPassword
      };
      this.changePasswordService.ChangePassword(changePassword).subscribe({
        next: (x) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Password Changed Successfully', life: 3000 });
          this.initializeChangePasswordFormGroup();
          this.loading = false;
        }, error: (err) => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
        }
      });

    }
    else {
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "New Password and Confirm Password does not match", life: 3000 });
    }
  }

}
