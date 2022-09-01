import { TestBed } from '@angular/core/testing';

import { IsNotRegisteredGuard } from './is-not-registered.guard';

describe('IsNotRegisteredGuard', () => {
  let guard: IsNotRegisteredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNotRegisteredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
