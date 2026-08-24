import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared.module';

@Component({
  selector: 'app-new-year',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './new-year.component.html',
  styleUrl: './new-year.component.scss'
})
export class NewYearComponent implements OnInit {
  newYear!: number;
  isVisible: boolean = false;

  ngOnInit(): void {
    const now = new Date();
    this.newYear = now.getFullYear();

    const month = now.getMonth(); // Jan is 0
    const date = now.getDate();

    if (month === 0 && date >= 1 && date <= 12) {
      this.isVisible = true;
    }
  }
}