import { TestBed } from '@angular/core/testing';

import { IsRegisteredGuard } from './is-registered.guard';

describe('IsRegisteredGuard', () => {
  let guard: IsRegisteredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsRegisteredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
