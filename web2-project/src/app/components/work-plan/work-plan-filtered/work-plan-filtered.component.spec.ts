import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanFilteredComponent } from './work-plan-filtered.component';

describe('WorkPlanFilteredComponent', () => {
  let component: WorkPlanFilteredComponent;
  let fixture: ComponentFixture<WorkPlanFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
