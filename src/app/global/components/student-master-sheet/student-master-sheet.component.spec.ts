import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMasterSheetComponent } from './student-master-sheet.component';

describe('StudentMasterSheetComponent', () => {
  let component: StudentMasterSheetComponent;
  let fixture: ComponentFixture<StudentMasterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMasterSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMasterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
