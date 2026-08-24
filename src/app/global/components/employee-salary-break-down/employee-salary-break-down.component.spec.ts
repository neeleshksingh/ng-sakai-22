import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryBreakDownComponent } from './employee-salary-break-down.component';

describe('EmployeeSalaryBreakDownComponent', () => {
  let component: EmployeeSalaryBreakDownComponent;
  let fixture: ComponentFixture<EmployeeSalaryBreakDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSalaryBreakDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSalaryBreakDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
