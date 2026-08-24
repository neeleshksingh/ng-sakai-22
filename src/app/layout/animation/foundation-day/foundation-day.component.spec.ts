import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationDayComponent } from './foundation-day.component';

describe('FoundationDayComponent', () => {
  let component: FoundationDayComponent;
  let fixture: ComponentFixture<FoundationDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundationDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
