import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanDeviceViewComponent } from './work-plan-device-view.component';

describe('WorkPlanDeviceViewComponent', () => {
  let component: WorkPlanDeviceViewComponent;
  let fixture: ComponentFixture<WorkPlanDeviceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanDeviceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanDeviceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
