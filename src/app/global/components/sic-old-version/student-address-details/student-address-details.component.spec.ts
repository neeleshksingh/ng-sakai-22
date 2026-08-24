import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddressDetailsComponent } from './student-address-details.component';

describe('StudentAddressDetailsComponent', () => {
  let component: StudentAddressDetailsComponent;
  let fixture: ComponentFixture<StudentAddressDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAddressDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
