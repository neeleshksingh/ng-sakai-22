import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@/shared.module';

@Component({
  selector: 'app-login-token-expired',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login-token-expired.component.html',
  styleUrls: ['./login-token-expired.component.scss']
})
export class LoginTokenExpiredComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
