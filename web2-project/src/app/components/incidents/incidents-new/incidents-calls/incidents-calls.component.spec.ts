import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsCallsComponent } from './incidents-calls.component';

describe('IncidentsCallsComponent', () => {
  let component: IncidentsCallsComponent;
  let fixture: ComponentFixture<IncidentsCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentsCallsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
