import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAccountMultimediaComponent } from './work-account-multimedia.component';

describe('WorkAccountMultimediaComponent', () => {
  let component: WorkAccountMultimediaComponent;
  let fixture: ComponentFixture<WorkAccountMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAccountMultimediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAccountMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
