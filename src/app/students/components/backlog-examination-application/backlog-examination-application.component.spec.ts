import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogExaminationApplicationComponent } from './backlog-examination-application.component';

describe('BacklogExaminationApplicationComponent', () => {
  let component: BacklogExaminationApplicationComponent;
  let fixture: ComponentFixture<BacklogExaminationApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogExaminationApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogExaminationApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
