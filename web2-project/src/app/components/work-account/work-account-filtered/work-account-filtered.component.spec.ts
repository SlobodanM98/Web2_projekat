import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAccountFilteredComponent } from './work-account-filtered.component';

describe('WorkAccountFilteredComponent', () => {
  let component: WorkAccountFilteredComponent;
  let fixture: ComponentFixture<WorkAccountFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAccountFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAccountFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
