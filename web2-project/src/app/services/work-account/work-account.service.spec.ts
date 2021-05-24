import { TestBed } from '@angular/core/testing';

import { WorkAccountService } from './work-account.service';

describe('WorkAccountService', () => {
  let service: WorkAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
