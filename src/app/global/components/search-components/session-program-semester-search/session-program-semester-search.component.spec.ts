import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionProgramSemesterSearchComponent } from './session-program-semester-search.component';

describe('SessionProgramSemesterSearchComponent', () => {
  let component: SessionProgramSemesterSearchComponent;
  let fixture: ComponentFixture<SessionProgramSemesterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionProgramSemesterSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionProgramSemesterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
