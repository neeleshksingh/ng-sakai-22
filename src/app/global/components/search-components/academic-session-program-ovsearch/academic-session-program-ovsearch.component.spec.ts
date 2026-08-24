import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSessionProgramOVSearchComponent } from './academic-session-program-ovsearch.component';

describe('AcademicSessionProgramOVSearchComponent', () => {
  let component: AcademicSessionProgramOVSearchComponent;
  let fixture: ComponentFixture<AcademicSessionProgramOVSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicSessionProgramOVSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSessionProgramOVSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
