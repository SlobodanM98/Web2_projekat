import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanMultimediaComponent } from './work-plan-multimedia.component';

describe('WorkPlanMultimediaComponent', () => {
  let component: WorkPlanMultimediaComponent;
  let fixture: ComponentFixture<WorkPlanMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanMultimediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
