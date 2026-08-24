import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGeneralDetailsComponent } from './student-general-details.component';

describe('StudentGeneralDetailsComponent', () => {
  let component: StudentGeneralDetailsComponent;
  let fixture: ComponentFixture<StudentGeneralDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentGeneralDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
