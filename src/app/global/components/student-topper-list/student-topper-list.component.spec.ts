import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTopperListComponent } from './student-topper-list.component';

describe('StudentTopperListComponent', () => {
  let component: StudentTopperListComponent;
  let fixture: ComponentFixture<StudentTopperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTopperListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTopperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
