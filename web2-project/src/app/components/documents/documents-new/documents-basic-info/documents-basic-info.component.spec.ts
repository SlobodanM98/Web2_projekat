import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsBasicInfoComponent } from './documents-basic-info.component';

describe('DocumentsBasicInfoComponent', () => {
  let component: DocumentsBasicInfoComponent;
  let fixture: ComponentFixture<DocumentsBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
