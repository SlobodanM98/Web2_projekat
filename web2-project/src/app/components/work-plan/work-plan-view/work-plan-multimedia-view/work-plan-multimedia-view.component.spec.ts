import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanMultimediaViewComponent } from './work-plan-multimedia-view.component';

describe('WorkPlanMultimediaViewComponent', () => {
  let component: WorkPlanMultimediaViewComponent;
  let fixture: ComponentFixture<WorkPlanMultimediaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanMultimediaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanMultimediaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
