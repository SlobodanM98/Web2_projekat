import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanInstructionsComponent } from './work-plan-instructions.component';

describe('WorkPlanInstructionsComponent', () => {
  let component: WorkPlanInstructionsComponent;
  let fixture: ComponentFixture<WorkPlanInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
