import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationResultComponent } from './examination-result.component';

describe('ExaminationResultComponent', () => {
  let component: ExaminationResultComponent;
  let fixture: ComponentFixture<ExaminationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminationResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
