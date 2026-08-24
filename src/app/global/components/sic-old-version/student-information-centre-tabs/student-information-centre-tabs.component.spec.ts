import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInformationCentreTabsComponent } from './student-information-centre-tabs.component';

describe('StudentInformationCentreTabsComponent', () => {
  let component: StudentInformationCentreTabsComponent;
  let fixture: ComponentFixture<StudentInformationCentreTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInformationCentreTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInformationCentreTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
