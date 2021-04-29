import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsFilteredComponent } from './documents-filtered.component';

describe('DocumentsFilteredComponent', () => {
  let component: DocumentsFilteredComponent;
  let fixture: ComponentFixture<DocumentsFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
