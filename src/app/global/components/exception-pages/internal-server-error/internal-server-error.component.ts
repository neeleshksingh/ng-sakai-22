import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@/shared.module';

@Component({
  selector: 'app-internal-server-error',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.scss']
})
export class InternalServerErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
