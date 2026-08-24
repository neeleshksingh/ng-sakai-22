import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonafiedJobComponent } from './bonafied-job.component';

describe('BonafiedJobComponent', () => {
  let component: BonafiedJobComponent;
  let fixture: ComponentFixture<BonafiedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonafiedJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonafiedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
