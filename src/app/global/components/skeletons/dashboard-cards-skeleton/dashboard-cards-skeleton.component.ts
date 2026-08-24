import { Component, Input, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-dashboard-cards-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './dashboard-cards-skeleton.component.html',
  styleUrl: './dashboard-cards-skeleton.component.scss'
})
export class DashboardCardsSkeletonComponent implements OnInit {

  @Input() data: any;

  ngOnInit(): void {
  }
}
