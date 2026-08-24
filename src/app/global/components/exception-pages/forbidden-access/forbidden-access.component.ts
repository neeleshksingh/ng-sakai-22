import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { LoginResponse } from 'src/app/shared/models/idp/login';

@Component({
  selector: 'app-forbidden-access',
  templateUrl: './forbidden-access.component.html',
  styleUrls: ['./forbidden-access.component.scss'],
  imports: [SharedModule],
  standalone: true
})
export class ForbiddenAccessComponent implements OnInit {
  routerLink: string = ''

  private currentUserSubject: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser')!));

  constructor() { }

  ngOnInit(): void {
    var data = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data ?? ''));

    const UserRole = this.currentUserSubject?.value?.applicationUser?.roles?.[0];

    if (UserRole?.toUpperCase() === 'STUDENT') {
      this.routerLink = '/home/students/dashboard';
    } else {
      this.routerLink = '/home/dashboard';
    }
  }
}
