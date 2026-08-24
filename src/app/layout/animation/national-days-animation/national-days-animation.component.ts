import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { NationalDaysService } from '../../service/animation.service';
interface AnimationConfig {
  show: boolean;
  title: string;
  year: number;
  ordinal: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  date: Date;
}

@Component({
  selector: 'app-national-days-animation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './national-days-animation.component.html',
  styleUrl: './national-days-animation.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateY(-20px)', opacity: 0 }))
      ])
    ])
  ]
})
export class NationalDaysAnimationComponent implements OnInit, OnDestroy {
  republicDayConfig: AnimationConfig = {
    show: false,
    title: 'Republic Day',
    year: 0,
    ordinal: '',
    colors: {
      primary: '#FF9933',
      secondary: '#FFFFFF',
      accent: '#138808'
    },
    date: new Date()
  };

  independenceDayConfig: AnimationConfig = {
    show: false,
    title: 'Independence Day',
    year: 0,
    ordinal: '',
    colors: {
      primary: '#FF9933',
      secondary: '#FFFFFF',
      accent: '#138808'
    },
    date: new Date()
  };

  private animationTimeout: any;
  private triggerSubscription: Subscription = new Subscription();

  constructor(private nationalDaysService: NationalDaysService) { }

  ngOnInit() {
    this.initializeConfigurations();

    // Subscribe to trigger events from topbar
    this.triggerSubscription = this.nationalDaysService.animationTriggered$.subscribe(
      (triggered) => {
        if (triggered) {
          this.checkAndShowAnimation();
        }
      }
    );

    // Only check for animations on first login
    if (this.isFirstLogin()) {
      this.checkAndShowAnimation();
    }
  }

  ngOnDestroy() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    if (this.triggerSubscription) {
      this.triggerSubscription.unsubscribe();
    }
  }

  private initializeConfigurations() {
    const currentYear = new Date().getFullYear();

    // Republic Day - Started in 1950
    const republicDayYear = currentYear - 1950 + 1;
    this.republicDayConfig.year = currentYear;
    this.republicDayConfig.ordinal = this.getOrdinal(republicDayYear);
    this.republicDayConfig.date = new Date(currentYear, 0, 26); // January 26

    // Independence Day - Started in 1947
    const independenceDayYear = currentYear - 1947 + 1;
    this.independenceDayConfig.year = currentYear;
    this.independenceDayConfig.ordinal = this.getOrdinal(independenceDayYear);
    this.independenceDayConfig.date = new Date(currentYear, 7, 15); // August 15
  }

  private getOrdinal(num: number): string {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${num}th`;
    }

    switch (lastDigit) {
      case 1:
        return `${num}st`;
      case 2:
        return `${num}nd`;
      case 3:
        return `${num}rd`;
      default:
        return `${num}th`;
    }
  }

  private isFirstLogin(): boolean {
    return !this.nationalDaysService.hasSeenAnimation();
  }

  private checkAndShowAnimation() {
    const now = new Date();
    const fiveDaysInMs = 3 * 24 * 60 * 60 * 1000;

    let animationShown = false;

    // Check Republic Day
    const republicDayDiff = this.republicDayConfig.date.getTime() - now.getTime();
    if (republicDayDiff <= fiveDaysInMs && republicDayDiff > -24 * 60 * 60 * 1000) {
      this.showAnimation('republic');
      animationShown = true;
    }

    // Check Independence Day
    const independenceDayDiff = this.independenceDayConfig.date.getTime() - now.getTime();
    if (independenceDayDiff <= fiveDaysInMs && independenceDayDiff > -24 * 60 * 60 * 1000) {
      this.showAnimation('independence');
      animationShown = true;
    }

    // Mark as shown only if an animation was actually displayed
    if (animationShown) {
      this.nationalDaysService.markAnimationAsShown();
    }
  }

  private showAnimation(type: 'republic' | 'independence') {
    // Clear any existing timeout first
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    if (type === 'republic') {
      this.republicDayConfig.show = true; // Always show, regardless of previous state
      this.scheduleHideAnimation('republic');
    } else if (type === 'independence') {
      this.independenceDayConfig.show = true;
      this.scheduleHideAnimation('independence');
    }
  }

  private scheduleHideAnimation(type: 'republic' | 'independence') {
    // Clear existing timeout to prevent conflicts
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    this.animationTimeout = setTimeout(() => {
      if (type === 'republic') {
        this.republicDayConfig.show = false;
      } else {
        this.independenceDayConfig.show = false;
      }
    }, 5000);
  }
}