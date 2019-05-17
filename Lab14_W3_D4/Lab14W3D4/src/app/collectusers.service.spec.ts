import { TestBed } from '@angular/core/testing';

import { CollectusersService } from './collectusers.service';

describe('CollectusersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollectusersService = TestBed.get(CollectusersService);
    expect(service).toBeTruthy();
  });
});
