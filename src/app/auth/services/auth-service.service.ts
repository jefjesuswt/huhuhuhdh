import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  constructor() {
    this.checkAuthTokenStatus().subscribe()
   };


  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);


  public http = inject(HttpClient);
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private setAuthenticationProps(user: User, token: string): boolean {
    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.authenticated)
    localStorage.setItem('token', token)
    console.log({user, token})

    return true;
  }

  public login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`
    const body = {
      email: email,
      password: password
    }

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({user, token}) => this.setAuthenticationProps(user, token)),

        catchError(err => throwError( () => err ))
      );
  }

  public register(email: string, name: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/register`
    const body = {
      email: email,
      name: name,
      password: password
    }

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({user, token}) => this.setAuthenticationProps(user, token)),

        catchError(err => throwError( () => err ))
      );
  }

  checkAuthTokenStatus(): Observable<boolean> {
    const url: string = `${this.baseUrl}/auth/check-token`;
    const token: string|null = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<CheckTokenResponse>(url, {headers})
      .pipe(
        map(({user, token}) => this.setAuthenticationProps(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated)
          return of(false)
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

}
