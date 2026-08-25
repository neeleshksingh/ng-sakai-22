import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveEdgeComponent } from './executive-edge.component';

describe('ExecutiveEdgeComponent', () => {
  let component: ExecutiveEdgeComponent;
  let fixture: ComponentFixture<ExecutiveEdgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveEdgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
