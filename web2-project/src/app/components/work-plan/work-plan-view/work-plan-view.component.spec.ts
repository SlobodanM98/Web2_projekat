import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanViewComponent } from './work-plan-view.component';

describe('WorkPlanViewComponent', () => {
  let component: WorkPlanViewComponent;
  let fixture: ComponentFixture<WorkPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
