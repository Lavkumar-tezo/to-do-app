import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),
        provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be able to login', () => {
    const token = 'token';
    const name = 'user';
    const password = 'password';
    const isLogging = true;
    service.login(name, password, isLogging).subscribe((result: string) => {
      expect(result).toEqual(token);
      expect(sessionStorage.getItem(service.tokenKey)).toEqual(token);
      expect(service.isLoggedIn).toBeTrue();
    });

    const req = httpTesting.expectOne(`${environment.URL}Auth/Login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: name, password: password });
    req.flush(token);
  });
});
