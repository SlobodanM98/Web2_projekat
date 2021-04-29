import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsNewComponent } from './incidents-new.component';

describe('IncidentsNewComponent', () => {
  let component: IncidentsNewComponent;
  let fixture: ComponentFixture<IncidentsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
