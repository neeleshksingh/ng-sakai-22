import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCenterGlobalComponent } from './document-center-global.component';

describe('DocumentCenterGlobalComponent', () => {
  let component: DocumentCenterGlobalComponent;
  let fixture: ComponentFixture<DocumentCenterGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentCenterGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCenterGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
