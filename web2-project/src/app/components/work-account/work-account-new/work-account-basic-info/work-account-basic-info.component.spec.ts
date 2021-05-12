import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAccountBasicInfoComponent } from './work-account-basic-info.component';

describe('WorkAccountBasicInfoComponent', () => {
  let component: WorkAccountBasicInfoComponent;
  let fixture: ComponentFixture<WorkAccountBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAccountBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAccountBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
