// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://your-fake-api.com'; // backend gələcəkdə buraya gələcək

//   constructor(private http: HttpClient) {}

//   // Qeydiyyat
//   register(user: { name: string; email: string; password: string }): Observable<any> {
//     // Hazırda fake response qaytarırıq
//     return of({ id: Date.now(), ...user }).pipe(
//       tap((res) => console.log('Registered user:', res))
//     );

//     // Gələcəkdə real backend üçün:
//     // return this.http.post(`${this.apiUrl}/register`, user);
//   }

//   // Login
//   login(email: string, password: string): Observable<any> {
//     // Fake token yaratmaq
//     const dummyToken = 'dummy-jwt-token-123456';

//     return of({ token: dummyToken, email }).pipe(
//       tap((res) => {
//         localStorage.setItem('auth_token', res.token);
//         console.log('Logged in:', res);
//       })
//     );

//     // Gələcəkdə real backend üçün:
//     // return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
//     //   tap((res: any) => localStorage.setItem('auth_token', res.token))
//     // );
//   }

//   // Logout
//   logout() {
//     localStorage.removeItem('auth_token');
//   }

//   // Token yoxlama
//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('auth_token');
//   }

//   // Tokeni almaq
//   getToken(): string | null {
//     return localStorage.getItem('auth_token');
//   }
// }


// src/app/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://your-fake-api.com'; // backend gələcəkdə buraya gələcək
  private _token = signal<string | null>(localStorage.getItem('auth_token'));

  constructor(private http: HttpClient) {}

  // Qeydiyyat
  register(user: { name: string; email: string; password: string }): Observable<any> {
    // Hazırda fake response qaytarırıq
    return of({ id: Date.now(), ...user }).pipe(
      tap((res) => console.log('Registered user:', res))
    );

    // Gələcəkdə real backend üçün:
    // return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login
  login(email: string, password: string): Observable<any> {
    // Fake token yaratmaq
    const dummyToken = 'dummy-jwt-token-123456';

    return of({ token: dummyToken, email }).pipe(
      tap((res) => {
        localStorage.setItem('auth_token', res.token);
        this._token.set(res.token);
        console.log('Logged in:', res);
      })
    );

    // Gələcəkdə real backend üçün:
    // return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
    //   tap((res: any) => {
    //     localStorage.setItem('auth_token', res.token);
    //     this._token.set(res.token);
    //   })
    // );
  }

  // Logout
  logout() {
    localStorage.removeItem('auth_token');
    this._token.set(null);
  }

  // Token yoxlama
  isLoggedIn(): boolean {
    return !!this._token();
  }

  // Tokeni almaq
  getToken(): string | null {
    return this._token();
  }
}
