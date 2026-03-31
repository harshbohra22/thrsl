import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'thrsl_token';
  private readonly USER_KEY = 'thrsl_user';

  // Signals for reactive state
  private _currentUser = signal<User | null>(this.getStoredUser());
  currentUser = computed(() => this._currentUser());
  isAuthenticated = computed(() => !!this._currentUser());

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, userData, { responseType: 'text' });
  }

  login(credentials: { username: string; password: string }): Observable<string> {
    return this.http.post(`${this.baseUrl}/token`, credentials, { responseType: 'text' }).pipe(
      tap(token => this.processToken(token, credentials.username))
    );
  }

  processToken(token: string, username: string): void {
    this.setToken(token);
    // Same mock user logic as login
    const mockUser: User = { 
      id: 1, 
      name: username.split('@')[0], 
      email: username 
    };
    this.setUser(mockUser);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._currentUser.set(user);
  }

  private getStoredUser(): User | null {
    try {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
      console.error('Error parsing stored user', e);
      localStorage.removeItem(this.USER_KEY);
      return null;
    }
  }
}
