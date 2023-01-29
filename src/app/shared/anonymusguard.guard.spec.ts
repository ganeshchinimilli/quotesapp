import { TestBed } from '@angular/core/testing';

import { AnonymusguardGuard } from './anonymusguard.guard';

describe('AnonymusguardGuard', () => {
  let guard: AnonymusguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnonymusguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
