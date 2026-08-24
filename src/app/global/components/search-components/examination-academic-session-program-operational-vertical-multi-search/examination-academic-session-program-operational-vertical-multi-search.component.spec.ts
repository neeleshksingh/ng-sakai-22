import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent } from './examination-academic-session-program-operational-vertical-multi-search.component';

describe('ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent', () => {
  let component: ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent;
  let fixture: ComponentFixture<ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
