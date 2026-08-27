import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindSparkComponent } from './mind-spark.component';

describe('MindSparkComponent', () => {
  let component: MindSparkComponent;
  let fixture: ComponentFixture<MindSparkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MindSparkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindSparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
