import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAccountHistoryStateChangesComponent } from './work-account-history-state-changes.component';

describe('WorkAccountHistoryStateChangesComponent', () => {
  let component: WorkAccountHistoryStateChangesComponent;
  let fixture: ComponentFixture<WorkAccountHistoryStateChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAccountHistoryStateChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAccountHistoryStateChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
