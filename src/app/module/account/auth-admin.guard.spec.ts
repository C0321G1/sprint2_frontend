import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { AuthAdminGuard } from './auth-admin.guard';

describe('AuthAdminGuard', () => {
  let guard: AuthAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
