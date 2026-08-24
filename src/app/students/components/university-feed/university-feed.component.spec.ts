import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityFeedComponent } from './university-feed.component';

describe('UniversityFeedComponent', () => {
  let component: UniversityFeedComponent;
  let fixture: ComponentFixture<UniversityFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
