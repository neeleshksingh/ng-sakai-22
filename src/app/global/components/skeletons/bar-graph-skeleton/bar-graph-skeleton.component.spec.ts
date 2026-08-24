import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraphSkeletonComponent } from './bar-graph-skeleton.component';

describe('BarGraphSkeletonComponent', () => {
  let component: BarGraphSkeletonComponent;
  let fixture: ComponentFixture<BarGraphSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarGraphSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarGraphSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
