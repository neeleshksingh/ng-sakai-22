import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBusHostelOptInOptOutComponent } from './student-bus-hostel-opt-in-opt-out.component';

describe('StudentBusHostelOptInOptOutComponent', () => {
  let component: StudentBusHostelOptInOptOutComponent;
  let fixture: ComponentFixture<StudentBusHostelOptInOptOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBusHostelOptInOptOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBusHostelOptInOptOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
