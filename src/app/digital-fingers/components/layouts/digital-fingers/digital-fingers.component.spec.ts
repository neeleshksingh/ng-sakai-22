import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalFingersComponent } from './digital-fingers.component';

describe('KnowledgeStandComponent', () => {
  let component: DigitalFingersComponent;
  let fixture: ComponentFixture<DigitalFingersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalFingersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalFingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
