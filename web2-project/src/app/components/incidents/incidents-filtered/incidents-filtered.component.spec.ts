import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsFilteredComponent } from './incidents-filtered.component';

describe('IncidentsFilteredComponent', () => {
  let component: IncidentsFilteredComponent;
  let fixture: ComponentFixture<IncidentsFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentsFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
