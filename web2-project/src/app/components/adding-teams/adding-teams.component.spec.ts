import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingTeamsComponent } from './adding-teams.component';

describe('AddingTeamsComponent', () => {
  let component: AddingTeamsComponent;
  let fixture: ComponentFixture<AddingTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
