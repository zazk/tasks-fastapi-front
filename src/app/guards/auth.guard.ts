import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionStorageService);
  const router = inject(Router);

  if (!sessionService.authToken) {
    router.navigateByUrl('/auth');
    return false
  }

  return true
};
