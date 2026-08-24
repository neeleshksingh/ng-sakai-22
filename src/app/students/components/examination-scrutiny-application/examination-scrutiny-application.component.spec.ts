import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationScrutinyApplicationComponent } from './examination-scrutiny-application.component';

describe('ExaminationScrutinyApplicationComponent', () => {
  let component: ExaminationScrutinyApplicationComponent;
  let fixture: ComponentFixture<ExaminationScrutinyApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminationScrutinyApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationScrutinyApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
