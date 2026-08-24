import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherListReportComponent } from './voucher-list-report.component';

describe('VoucherListReportComponent', () => {
  let component: VoucherListReportComponent;
  let fixture: ComponentFixture<VoucherListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherListReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
