import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationAcademicSessionProgramOvSearchComponent } from './examination-academic-session-program-ov-search.component';

describe('ExaminationAcademicSessionProgramOvSearchComponent', () => {
  let component: ExaminationAcademicSessionProgramOvSearchComponent;
  let fixture: ComponentFixture<ExaminationAcademicSessionProgramOvSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminationAcademicSessionProgramOvSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationAcademicSessionProgramOvSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
