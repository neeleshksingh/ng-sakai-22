import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmissionWithdrawalListComponent } from './student-admission-withdrawal-list.component';

describe('StudentAdmissionWithdrawalListComponent', () => {
  let component: StudentAdmissionWithdrawalListComponent;
  let fixture: ComponentFixture<StudentAdmissionWithdrawalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAdmissionWithdrawalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAdmissionWithdrawalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
