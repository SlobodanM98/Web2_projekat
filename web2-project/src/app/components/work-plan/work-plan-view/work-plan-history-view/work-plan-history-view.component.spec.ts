import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanHistoryViewComponent } from './work-plan-history-view.component';

describe('WorkPlanHistoryViewComponent', () => {
  let component: WorkPlanHistoryViewComponent;
  let fixture: ComponentFixture<WorkPlanHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanHistoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
