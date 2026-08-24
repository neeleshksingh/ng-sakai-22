import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptV2Component } from './receipt-v2.component';

describe('ReceiptV2Component', () => {
  let component: ReceiptV2Component;
  let fixture: ComponentFixture<ReceiptV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
