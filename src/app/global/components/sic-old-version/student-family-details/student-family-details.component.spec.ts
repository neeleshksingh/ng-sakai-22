import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFamilyDetailsComponent } from './student-family-details.component';

describe('StudentFamilyDetailsComponent', () => {
  let component: StudentFamilyDetailsComponent;
  let fixture: ComponentFixture<StudentFamilyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFamilyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFamilyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
