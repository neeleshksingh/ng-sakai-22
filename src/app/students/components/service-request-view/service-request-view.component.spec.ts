import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestViewComponent } from './service-request-view.component';

describe('ServiceRequestViewComponent', () => {
  let component: ServiceRequestViewComponent;
  let fixture: ComponentFixture<ServiceRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRequestViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
