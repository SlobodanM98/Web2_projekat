import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesFilteredComponent } from './devices-filtered.component';

describe('DevicesFilteredComponent', () => {
  let component: DevicesFilteredComponent;
  let fixture: ComponentFixture<DevicesFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
