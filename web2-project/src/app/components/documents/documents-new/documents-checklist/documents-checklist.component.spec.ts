import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsChecklistComponent } from './documents-checklist.component';

describe('DocumentsChecklistComponent', () => {
  let component: DocumentsChecklistComponent;
  let fixture: ComponentFixture<DocumentsChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
