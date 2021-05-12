import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAccountNewComponent } from './work-account-new.component';

describe('WorkAccountNewComponent', () => {
  let component: WorkAccountNewComponent;
  let fixture: ComponentFixture<WorkAccountNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAccountNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAccountNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
