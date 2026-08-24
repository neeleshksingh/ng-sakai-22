import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayAnimationComponent } from './birthday-animation.component';

describe('BirthdayAnimationComponent', () => {
  let component: BirthdayAnimationComponent;
  let fixture: ComponentFixture<BirthdayAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthdayAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
