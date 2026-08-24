import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSessionViewComponent } from './academic-session-view.component';

describe('AcademicSessionViewComponent', () => {
  let component: AcademicSessionViewComponent;
  let fixture: ComponentFixture<AcademicSessionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicSessionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSessionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
