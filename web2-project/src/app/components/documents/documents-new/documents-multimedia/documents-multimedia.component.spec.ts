import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsMultimediaComponent } from './documents-multimedia.component';

describe('DocumentsMultimediaComponent', () => {
  let component: DocumentsMultimediaComponent;
  let fixture: ComponentFixture<DocumentsMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsMultimediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
