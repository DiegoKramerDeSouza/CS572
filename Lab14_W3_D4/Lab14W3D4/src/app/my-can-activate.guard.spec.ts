import { TestBed, async, inject } from '@angular/core/testing';

import { MyCanActivateGuard } from './my-can-activate.guard';

describe('MyCanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCanActivateGuard]
    });
  });

  it('should ...', inject([MyCanActivateGuard], (guard: MyCanActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
