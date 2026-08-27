import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceProComponent } from './finance-pro.component';

describe('FinanceProComponent', () => {
  let component: FinanceProComponent;
  let fixture: ComponentFixture<FinanceProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
