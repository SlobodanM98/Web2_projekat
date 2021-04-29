import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsBasicInfoComponent } from './incidents-basic-info.component';

describe('IncidentsBasicInfoComponent', () => {
  let component: IncidentsBasicInfoComponent;
  let fixture: ComponentFixture<IncidentsBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentsBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
