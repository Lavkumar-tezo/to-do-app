import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let auth:AuthService=inject(AuthService);
  return auth.isAuthenticated();
};
