import { Component } from '@angular/core';
import { SharedModule } from '@/shared.module';

@Component({
  selector: 'app-birthday-animation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './birthday-animation.component.html',
  styleUrl: './birthday-animation.component.scss'
})
export class BirthdayAnimationComponent {
  happyBirthdayText = 'Happy Birthday';
  displayedText = '';
  currentIndex = 0;
  animateBottom = false;
  animateMiddle = false;
  animateTop = false;
  showAnimation = false;
  userName: string = '';

  ngOnInit(): void {
    this.startCakeAnimation();

    setInterval(() => this.startCakeAnimation(), 5000);

    const currentUser = localStorage.getItem('currentUser');
    let user = currentUser ? JSON.parse(currentUser) : null;
    this.userName = user.applicationUser.firstName;
  }

  animateLayers() {
    const bottomLayer = document.querySelector('.layer-bottom');
    const middleLayer = document.querySelector('.layer-middle');
    const topLayer = document.querySelector('.layer-top');

    if (bottomLayer) bottomLayer.classList.remove('animate', 'fadeOut');
    if (middleLayer) middleLayer.classList.remove('animate', 'fadeOut');
    if (topLayer) topLayer.classList.remove('animate', 'fadeOut');

    if (bottomLayer) void (bottomLayer as HTMLElement).offsetWidth;

    setTimeout(() => {
      if (bottomLayer) bottomLayer.classList.add('animate');
    }, 1400);

    setTimeout(() => {
      if (middleLayer) middleLayer.classList.add('animate');
    }, 800);

    setTimeout(() => {
      if (topLayer) topLayer.classList.add('animate');
    }, 200);
  }

  resetLayers() {
    const layers = document.querySelectorAll('.layer');

    layers.forEach(layer => {
      layer.classList.add('fadeOut');
    });

    setTimeout(() => {
      layers.forEach(layer => {
        layer.classList.remove('animate', 'fadeOut');
      });
    }, 500);
  }

  startCakeAnimation() {
    this.animateLayers();
    setTimeout(() => {
      this.resetLayers();
    }, 2500 + 1000);
  }

  onCakeClick() {
    this.showAnimation = true;
    setTimeout(() => {
      this.showAnimation = false;
    }, 5000);
  }
}