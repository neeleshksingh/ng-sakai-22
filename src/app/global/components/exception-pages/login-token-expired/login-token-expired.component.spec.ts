import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTokenExpiredComponent } from './login-token-expired.component';

describe('LoginTokenExpiredComponent', () => {
  let component: LoginTokenExpiredComponent;
  let fixture: ComponentFixture<LoginTokenExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTokenExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTokenExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
