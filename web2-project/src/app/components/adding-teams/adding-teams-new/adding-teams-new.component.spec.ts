import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingTeamsNewComponent } from './adding-teams-new.component';

describe('AddingTeamsNewComponent', () => {
  let component: AddingTeamsNewComponent;
  let fixture: ComponentFixture<AddingTeamsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingTeamsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingTeamsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
