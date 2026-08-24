import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudBytesComponent } from './cloud-bytes.component';

describe('CloudBytesComponent', () => {
  let component: CloudBytesComponent;
  let fixture: ComponentFixture<CloudBytesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudBytesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudBytesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
