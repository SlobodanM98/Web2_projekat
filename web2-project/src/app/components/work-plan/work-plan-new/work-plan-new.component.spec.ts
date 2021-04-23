import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanNewComponent } from './work-plan-new.component';

describe('WorkPlanNewComponent', () => {
  let component: WorkPlanNewComponent;
  let fixture: ComponentFixture<WorkPlanNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
