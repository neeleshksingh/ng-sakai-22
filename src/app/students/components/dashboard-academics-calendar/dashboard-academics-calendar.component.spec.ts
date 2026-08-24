import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAcademicsCalendarComponent } from './dashboard-academics-calendar.component';

describe('DashboardAcademicsCalendarComponent', () => {
  let component: DashboardAcademicsCalendarComponent;
  let fixture: ComponentFixture<DashboardAcademicsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAcademicsCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAcademicsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
