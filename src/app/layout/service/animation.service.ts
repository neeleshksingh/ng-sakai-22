import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NationalDaysService {
  private readonly ANIMATION_SHOWN_KEY = 'national_days_animation_shown';
  private triggerSubject = new BehaviorSubject<boolean>(false);

  // Observable for components to subscribe to trigger events
  get animationTriggered$(): Observable<boolean> {
    return this.triggerSubject.asObservable();
  }

  hasSeenAnimation(): boolean {
    return !!localStorage.getItem(this.ANIMATION_SHOWN_KEY);
  }

  markAnimationAsShown(): void {
    localStorage.setItem(this.ANIMATION_SHOWN_KEY, 'true');
  }

  triggerAnimation(): void {
    this.triggerSubject.next(true);
  }

  resetAnimationState(): void {
    localStorage.removeItem(this.ANIMATION_SHOWN_KEY);
  }
}