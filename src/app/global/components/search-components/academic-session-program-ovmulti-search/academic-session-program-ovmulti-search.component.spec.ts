import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSessionProgramOVMultiSearchComponent } from './academic-session-program-ovmulti-search.component';

describe('AcademicSessionProgramOVMultiSearchComponent', () => {
  let component: AcademicSessionProgramOVMultiSearchComponent;
  let fixture: ComponentFixture<AcademicSessionProgramOVMultiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicSessionProgramOVMultiSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSessionProgramOVMultiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
