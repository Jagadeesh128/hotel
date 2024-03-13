import { TestBed } from '@angular/core/testing';

import { BookingGuardGuard } from './booking-guard.guard';

describe('BookingGuardGuard', () => {
  let guard: BookingGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BookingGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
