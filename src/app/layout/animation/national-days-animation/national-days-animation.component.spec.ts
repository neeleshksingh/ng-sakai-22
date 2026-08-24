import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalDaysAnimationComponent } from './national-days-animation.component';

describe('NationalDaysAnimationComponent', () => {
  let component: NationalDaysAnimationComponent;
  let fixture: ComponentFixture<NationalDaysAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationalDaysAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalDaysAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
