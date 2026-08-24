import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitCardV2Component } from './admit-card-v2.component';

describe('AdmitCardV2Component', () => {
  let component: AdmitCardV2Component;
  let fixture: ComponentFixture<AdmitCardV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmitCardV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmitCardV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
