import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogExaminationRegistrationComponent } from './backlog-examination-registration.component';

describe('BacklogExaminationRegistrationComponent', () => {
  let component: BacklogExaminationRegistrationComponent;
  let fixture: ComponentFixture<BacklogExaminationRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogExaminationRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogExaminationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
