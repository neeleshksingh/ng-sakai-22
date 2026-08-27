import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBasicInformationComponent } from './employee-basic-information.component';

describe('EmployeeBasicInformationComponent', () => {
  let component: EmployeeBasicInformationComponent;
  let fixture: ComponentFixture<EmployeeBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeBasicInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
