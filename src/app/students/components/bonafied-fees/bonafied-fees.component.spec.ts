import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonafiedFeesComponent } from './bonafied-fees.component';

describe('BonafiedFeesComponent', () => {
  let component: BonafiedFeesComponent;
  let fixture: ComponentFixture<BonafiedFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonafiedFeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonafiedFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
