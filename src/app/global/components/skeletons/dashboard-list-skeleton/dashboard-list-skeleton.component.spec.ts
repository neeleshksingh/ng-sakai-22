import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardListSkeletonComponent } from './dashboard-list-skeleton.component';

describe('DashboardListSkeletonComponent', () => {
  let component: DashboardListSkeletonComponent;
  let fixture: ComponentFixture<DashboardListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardListSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
