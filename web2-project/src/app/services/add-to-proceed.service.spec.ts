import { TestBed } from '@angular/core/testing';

import { AddToProceedService } from './add-to-proceed.service';

describe('AddToProceedService', () => {
  let service: AddToProceedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToProceedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
