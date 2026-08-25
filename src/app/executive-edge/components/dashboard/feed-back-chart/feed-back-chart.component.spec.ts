import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackChartComponent } from './feed-back-chart.component';

describe('FeedBackChartComponent', () => {
  let component: FeedBackChartComponent;
  let fixture: ComponentFixture<FeedBackChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedBackChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedBackChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
