import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsCrewComponent } from './incidents-crew.component';

describe('IncidentsCrewComponent', () => {
  let component: IncidentsCrewComponent;
  let fixture: ComponentFixture<IncidentsCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentsCrewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
