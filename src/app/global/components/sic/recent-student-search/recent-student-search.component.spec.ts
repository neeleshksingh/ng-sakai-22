import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentStudentSearchComponent } from './recent-student-search.component';

describe('RecentStudentSearchComponent', () => {
  let component: RecentStudentSearchComponent;
  let fixture: ComponentFixture<RecentStudentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentStudentSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentStudentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
