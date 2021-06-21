import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsDevicesComponent } from './documents-devices.component';

describe('DocumentsDevicesComponent', () => {
  let component: DocumentsDevicesComponent;
  let fixture: ComponentFixture<DocumentsDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
