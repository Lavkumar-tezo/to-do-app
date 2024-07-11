import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  tokenKey = 'auth-token';

  constructor(private http: HttpClient) {
  }

  login(name: string, password: string, isLogging: boolean): Observable<string> {
    let endpoint: string = (isLogging) ? 'Login' : 'Register';
    const body = {
      name: name,
      password: password
    }
  
    return this.http.post(`${environment.URL}Auth/${endpoint}`,body, { responseType: 'text' }).pipe(
      tap(token => {
        sessionStorage.setItem(this.tokenKey, token);
        this.isLoggedIn=true;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        sessionStorage.removeItem(this.tokenKey);
        this.isLoggedIn=false;
        return of(''); 
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
