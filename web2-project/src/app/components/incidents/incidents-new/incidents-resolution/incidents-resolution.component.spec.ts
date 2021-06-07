import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsResolutionComponent } from './incidents-resolution.component';

describe('IncidentsResolutionComponent', () => {
  let component: IncidentsResolutionComponent;
  let fixture: ComponentFixture<IncidentsResolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentsResolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
