import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '@/shared.module';
import { ProgressBarService } from '../../services/common/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  showProgress = false;
  private minDisplayTime = 500; // Minimum display time in milliseconds
  private startTime: number | null = null;

  constructor(
    private progressBarService: ProgressBarService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.progressBarService.getProgressBarObserver().subscribe((status) => {
      const currentRoute = this.router.url;
      const excludeRoutes = ['/Login', '/', '/Home/Landing', '/Home/Settings/RefreshCachedData'];
      const shouldShow = !excludeRoutes.includes(currentRoute);

      if (status === 'start' && shouldShow) {
        this.startTime = Date.now();
        this.showProgress = true;
        this.cdRef.detectChanges();
      } else if (status === 'stop' && this.showProgress) {
        const elapsedTime = this.startTime ? Date.now() - this.startTime : 0;
        const remainingTime = this.minDisplayTime - elapsedTime;

        setTimeout(() => {
          this.showProgress = false;
          this.startTime = null;
          this.cdRef.detectChanges();
        }, Math.max(0, remainingTime));
      }
    });
  }
}