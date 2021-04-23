import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanBasicInfoComponent } from './work-plan-basic-info.component';

describe('WorkPlanBasicInfoComponent', () => {
  let component: WorkPlanBasicInfoComponent;
  let fixture: ComponentFixture<WorkPlanBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
