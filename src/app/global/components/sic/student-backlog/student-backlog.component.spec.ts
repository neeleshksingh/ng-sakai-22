import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBacklogComponent } from './student-backlog.component';

describe('StudentBacklogComponent', () => {
  let component: StudentBacklogComponent;
  let fixture: ComponentFixture<StudentBacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBacklogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
