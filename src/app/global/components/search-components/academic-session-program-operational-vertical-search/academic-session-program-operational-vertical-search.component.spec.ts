import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSessionProgramOperationalVerticalSearchComponent } from './academic-session-program-operational-vertical-search.component';

describe('AcademicSessionProgramOperationalVerticalSearchComponent', () => {
  let component: AcademicSessionProgramOperationalVerticalSearchComponent;
  let fixture: ComponentFixture<AcademicSessionProgramOperationalVerticalSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicSessionProgramOperationalVerticalSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSessionProgramOperationalVerticalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
