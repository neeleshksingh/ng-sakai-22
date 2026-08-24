import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationRegistrationComponent } from './examination-registration.component';

describe('ExaminationRegistrationComponent', () => {
  let component: ExaminationRegistrationComponent;
  let fixture: ComponentFixture<ExaminationRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminationRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
