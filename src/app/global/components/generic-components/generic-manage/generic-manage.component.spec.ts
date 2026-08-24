import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericManageComponent } from './generic-manage.component';

describe('GenericManageComponent', () => {
  let component: GenericManageComponent;
  let fixture: ComponentFixture<GenericManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
