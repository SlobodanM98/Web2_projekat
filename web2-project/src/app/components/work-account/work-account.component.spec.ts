import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAccountComponent } from './work-account.component';

describe('WorkAccountComponent', () => {
  let component: WorkAccountComponent;
  let fixture: ComponentFixture<WorkAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
