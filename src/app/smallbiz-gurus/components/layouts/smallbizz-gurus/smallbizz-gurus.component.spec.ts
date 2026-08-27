import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallbizzGurusComponent } from './smallbizz-gurus.component';

describe('SmallbizzGurusComponent', () => {
  let component: SmallbizzGurusComponent;
  let fixture: ComponentFixture<SmallbizzGurusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallbizzGurusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallbizzGurusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
