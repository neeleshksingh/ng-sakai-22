import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigLeadsComponent } from './big-leads.component';

describe('BigLeadsComponent', () => {
  let component: BigLeadsComponent;
  let fixture: ComponentFixture<BigLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
