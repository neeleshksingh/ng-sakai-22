import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationBacklogHistoryComponent } from './examination-backlog-history.component';

describe('ExaminationBacklogHistoryComponent', () => {
  let component: ExaminationBacklogHistoryComponent;
  let fixture: ComponentFixture<ExaminationBacklogHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminationBacklogHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationBacklogHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
