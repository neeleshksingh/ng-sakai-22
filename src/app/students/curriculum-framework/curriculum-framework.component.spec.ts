import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumFrameworkComponent } from './curriculum-framework.component';

describe('CurriculumFrameworkComponent', () => {
  let component: CurriculumFrameworkComponent;
  let fixture: ComponentFixture<CurriculumFrameworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumFrameworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculumFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
