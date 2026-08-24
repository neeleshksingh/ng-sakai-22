import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeeLedgerComponent } from './student-fee-ledger.component';

describe('StudentFeeLedgerComponent', () => {
  let component: StudentFeeLedgerComponent;
  let fixture: ComponentFixture<StudentFeeLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFeeLedgerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFeeLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
