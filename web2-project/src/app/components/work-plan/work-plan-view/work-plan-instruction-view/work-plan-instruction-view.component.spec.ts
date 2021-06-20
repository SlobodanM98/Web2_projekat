import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanInstructionViewComponent } from './work-plan-instruction-view.component';

describe('WorkPlanInstructionViewComponent', () => {
  let component: WorkPlanInstructionViewComponent;
  let fixture: ComponentFixture<WorkPlanInstructionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanInstructionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanInstructionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
