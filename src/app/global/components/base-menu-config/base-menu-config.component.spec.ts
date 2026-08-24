import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMenuConfigComponent } from './base-menu-config.component';

describe('BaseMenuConfigComponent', () => {
  let component: BaseMenuConfigComponent;
  let fixture: ComponentFixture<BaseMenuConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseMenuConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseMenuConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
