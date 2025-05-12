import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const url: string = state.url;
  localStorage.setItem('url', url);

  const authService = inject(AuthService);
  const router = inject(Router);

  if ((authService.authStatus() === AuthStatus.authenticated)) {
    return true;
  }

  router.navigate(['auth', 'login']);
  return false;
};
