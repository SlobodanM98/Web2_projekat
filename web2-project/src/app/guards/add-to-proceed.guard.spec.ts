import { TestBed } from '@angular/core/testing';

import { AddToProceedGuard } from './add-to-proceed.guard';

describe('AddToProceedGuard', () => {
  let guard: AddToProceedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddToProceedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
