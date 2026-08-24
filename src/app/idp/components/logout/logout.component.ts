import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { HasPermissionPipe } from 'src/app/shared/pipes/has-permission.pipe';
import { StudentProfileActions } from 'src/app/store/actions/student-profile.actions';
import { StudentProgramActions } from 'src/app/store/actions/student-program.actions';
import { AuthenticationService } from '../../services/authentication-service.service';
import { SharedModule } from '@/shared.module';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  providers: [HasPermissionPipe, ConfirmationService],
})
export class LogoutComponent {
  logoutDialog: boolean = true;
  changeColor: boolean = true;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private hasPermissionPipe: HasPermissionPipe,
    private location: Location,
    private store: Store) { }

  ngOnInit(): void { }

  onClickYes() {
    this.store.dispatch(StudentProfileActions.clearStudentProfile());
    this.store.dispatch(StudentProgramActions.clearStudentPrograms());
    this.authenticationService.logout();
    // Replace the current history state to prevent back navigation to logout
    this.location.replaceState('/login');
    this.router.navigate(['/login']);
    localStorage.removeItem('employeeDetails');
    localStorage.removeItem('employee-details');
    localStorage.removeItem('national_days_animation_shown');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userMenuPreferences');

    this.hasPermissionPipe.clearCache();
  }

  onClickNo() {
    this.location.back();
  }
}