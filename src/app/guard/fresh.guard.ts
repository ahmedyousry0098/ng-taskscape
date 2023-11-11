import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const freshGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isFresh()) {
    return true;
  } else {
    router.navigate(['/workspace']);
    return false;
  }
};
