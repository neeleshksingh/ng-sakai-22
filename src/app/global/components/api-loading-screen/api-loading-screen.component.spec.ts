import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLoadingScreenComponent } from './api-loading-screen.component';

describe('ApiLoadingScreenComponent', () => {
  let component: ApiLoadingScreenComponent;
  let fixture: ComponentFixture<ApiLoadingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiLoadingScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLoadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
