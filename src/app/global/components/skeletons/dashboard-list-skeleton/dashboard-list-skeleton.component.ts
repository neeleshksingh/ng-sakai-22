import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-dashboard-list-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './dashboard-list-skeleton.component.html',
  styleUrl: './dashboard-list-skeleton.component.scss'
})
export class DashboardListSkeletonComponent {
  @Input() data: any;

  ngOnInit(): void {
  }
}
