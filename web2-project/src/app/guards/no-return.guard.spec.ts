import { TestBed } from '@angular/core/testing';

import { NoReturnGuard } from './no-return.guard';

describe('NoReturnGuard', () => {
  let guard: NoReturnGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoReturnGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
