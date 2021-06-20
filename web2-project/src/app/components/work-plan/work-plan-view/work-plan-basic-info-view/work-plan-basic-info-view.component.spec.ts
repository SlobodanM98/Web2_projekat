import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanBasicInfoViewComponent } from './work-plan-basic-info-view.component';

describe('WorkPlanBasicInfoViewComponent', () => {
  let component: WorkPlanBasicInfoViewComponent;
  let fixture: ComponentFixture<WorkPlanBasicInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanBasicInfoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanBasicInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
