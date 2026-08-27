import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeStandComponent } from './knowledge-stand.component';

describe('KnowledgeStandComponent', () => {
  let component: KnowledgeStandComponent;
  let fixture: ComponentFixture<KnowledgeStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeStandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowledgeStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
