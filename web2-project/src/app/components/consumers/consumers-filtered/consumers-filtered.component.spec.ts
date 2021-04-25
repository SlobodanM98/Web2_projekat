import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersFilteredComponent } from './consumers-filtered.component';

describe('ConsumersFilteredComponent', () => {
  let component: ConsumersFilteredComponent;
  let fixture: ComponentFixture<ConsumersFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumersFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
