import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyStudentABCIdComponent } from './verify-student-abcid.component';

describe('VerifyStudentABCIdComponent', () => {
  let component: VerifyStudentABCIdComponent;
  let fixture: ComponentFixture<VerifyStudentABCIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyStudentABCIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyStudentABCIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
