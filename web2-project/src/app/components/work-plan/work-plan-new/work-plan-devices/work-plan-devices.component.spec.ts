import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanDevicesComponent } from './work-plan-devices.component';

describe('WorkPlanDevicesComponent', () => {
  let component: WorkPlanDevicesComponent;
  let fixture: ComponentFixture<WorkPlanDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
