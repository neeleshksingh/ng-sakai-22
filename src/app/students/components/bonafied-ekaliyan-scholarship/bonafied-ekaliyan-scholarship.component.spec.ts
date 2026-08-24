import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonafiedEKaliyanScholarshipComponent } from './bonafied-ekaliyan-scholarship.component';

describe('BonafiedEKaliyanScholarshipComponent', () => {
  let component: BonafiedEKaliyanScholarshipComponent;
  let fixture: ComponentFixture<BonafiedEKaliyanScholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonafiedEKaliyanScholarshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonafiedEKaliyanScholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
