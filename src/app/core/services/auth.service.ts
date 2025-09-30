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
// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://your-fake-api.com'; // backend gələcəkdə buraya gələcək
//   private _token = signal<string | null>(localStorage.getItem('auth_token'));

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
//         this._token.set(res.token);
//         console.log('Logged in:', res);
//       })
//     );

//     // Gələcəkdə real backend üçün:
//     // return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
//     //   tap((res: any) => {
//     //     localStorage.setItem('auth_token', res.token);
//     //     this._token.set(res.token);
//     //   })
//     // );
//   }

//   // Logout
//   logout() {
//     localStorage.removeItem('auth_token');
//     this._token.set(null);
//   }

//   // Token yoxlama
//   isLoggedIn(): boolean {
//     return !!this._token();
//   }

//   // Tokeni almaq
//   getToken(): string | null {
//     return this._token();
//   }
// }



// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap, map } from 'rxjs/operators';
// import { User } from '../../models/user';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://68d5481be29051d1c0adff01.mockapi.io/cardata/users';
//   private _token = signal<string | null>(localStorage.getItem('auth_token'));

//   constructor(private http: HttpClient) {}

//   // ✅ Qeydiyyat
//   register(user: User): Observable<User> {
//     return this.http.post<User>(this.apiUrl, user).pipe(
//       tap((res) => console.log('Registered user:', res))
//     );
//   }

//   // ✅ Login
//   login(login: string, parol: string): Observable<string | null> {
//     return this.http.get<User[]>(this.apiUrl).pipe(
//       map((users) => {
//         const found = users.find(u => u.login === login && u.parol === parol);
//         if (found) {
//           localStorage.setItem('auth_token', found.token);
//           this._token.set(found.token);
//           console.log('Logged in:', found);
//           return found.token;
//         }
//         return null;
//       })
//     );
//   }

//   // ✅ Logout
//   logout() {
//     localStorage.removeItem('auth_token');
//     this._token.set(null);
//   }

//   // ✅ Token yoxlama
//   isLoggedIn(): boolean {
//     return !!this._token();
//   }

//   // ✅ Tokeni almaq
//   getToken(): string | null {
//     return this._token();
//   }
// }


// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap, map } from 'rxjs/operators';
// import { User } from '../../models/user';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://68d5481be29051d1c0adff01.mockapi.io/cardata/users';
//   private _token = signal<string | null>(localStorage.getItem('auth_token'));

//   constructor(private http: HttpClient) {}

//   // ✅ Qeydiyyat
//   register(user: User): Observable<User> {
//     return this.http.post<User>(this.apiUrl, user).pipe(
//       tap((res) => console.log('Registered user:', res))
//     );
//   }

//   // ✅ Login
//   login(login: string, parol: string): Observable<string | null> {
//     return this.http.get<User[]>(this.apiUrl).pipe(
//       map((users) => {
//         const foundUser = users.find(u => u.login === login);
//         if (!foundUser) {
//           throw new Error('İstifadəçi tapılmadı!');
//         }
//         if (foundUser.parol !== parol) {
//           throw new Error('Şifrə yanlışdır!');
//         }
//         localStorage.setItem('auth_token', foundUser.token);
//         this._token.set(foundUser.token);
//         return foundUser.token;
//       })
//     );
//   }

//   logout() {
//     localStorage.removeItem('auth_token');
//     this._token.set(null);
//   }

//   isLoggedIn(): boolean {
//     return !!this._token();
//   }

//   getToken(): string | null {
//     return this._token();
//   }
// }


// src/app/core/services/auth.service.ts
// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap, map } from 'rxjs/operators';
// import { User } from '../../models/user';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://68d5481be29051d1c0adff01.mockapi.io/cardata/users';
//   private _token = signal<string | null>(localStorage.getItem('auth_token'));

//   constructor(private http: HttpClient) {}

//   // ✅ Qeydiyyat (rol göndərilmir)
//   register(user: Omit<User, 'role'>): Observable<User> {
//     return this.http.post<User>(this.apiUrl, user).pipe(
//       tap((res) => console.log('Registered user:', res))
//     );
//   }

//   // ✅ Login
//   login(login: string, parol: string): Observable<User | null> {
//     return this.http.get<User[]>(this.apiUrl).pipe(
//       map((users) => {
//         const found = users.find(u => u.login === login);
//         if (!found) {
//           throw new Error('User not found');
//         }
//         if (found.parol !== parol) {
//           throw new Error('Wrong password');
//         }

//         // Token və user məlumatlarını saxla
//         localStorage.setItem('auth_token', found.token);
//         localStorage.setItem('current_user', JSON.stringify(found));
//         this._token.set(found.token);

//         return found;
//       })
//     );
//   }

//   // ✅ Logout
//   logout() {
//     localStorage.removeItem('auth_token');
//     localStorage.removeItem('current_user');
//     this._token.set(null);
//   }

//   // ✅ Token yoxlama
//   isLoggedIn(): boolean {
//     return !!this._token();
//   }

//   // ✅ Tokeni almaq
//   getToken(): string | null {
//     return this._token();
//   }

//   // ✅ Cari istifadəçini almaq
//   getCurrentUser(): User | null {
//     const data = localStorage.getItem('current_user');
//     return data ? JSON.parse(data) : null;
//   }
//   toggleFavorite(userId: string, carId: string, isFavorite: boolean): Observable<User> {
//   return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
//     map(user => {
//       const updatedFavorites = isFavorite
//         ? user.favorites.filter(id => id !== carId)
//         : [...user.favorites, carId];

//       return { ...user, favorites: updatedFavorites };
//     }),
//     switchMap(updatedUser =>
//       this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser).pipe(
//         tap(u => {
//           localStorage.setItem('current_user', JSON.stringify(u));
//         })
//       )
//     )
//   );
// }

// getRole(): string | null {
//   return this.getCurrentUser()?.role ?? null;
// }

// }

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://68d5481be29051d1c0adff01.mockapi.io/cardata/users';
  private _token = signal<string | null>(localStorage.getItem('auth_token'));

  constructor(private http: HttpClient) {}

  // ---- helpers ----
  private normalizeFavorites(arr: any): string[] {
    if (!Array.isArray(arr)) return [];
    // bütün elementləri string-ə çevir və təkrarlananları sil
    return Array.from(new Set(arr.map((x: any) => String(x))));
  }

  private persistUser(u: User) {
    const normalized = { ...u, favorites: this.normalizeFavorites((u as any).favorites) };
    localStorage.setItem('current_user', JSON.stringify(normalized));
    return normalized;
  }

  // ✅ Register (rol göndərmirik, favorites default boş)
  register(user: Omit<User, 'role'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, {
      ...user,
      favorites: []
    }).pipe(
      tap((res) => console.log('Registered user:', res))
    );
  }

  // ✅ Login (həmişə serverdən gələn user-i normalizə edib saxlayırıq)
  login(login: string, parol: string): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const found = users.find(u => u.login === login);
        if (!found) throw new Error('User not found');
        if (found.parol !== parol) throw new Error('Wrong password');

        const normalized = this.persistUser(found);
        localStorage.setItem('auth_token', normalized.token);
        this._token.set(normalized.token);

        return normalized;
      })
    );
  }

  // ✅ Logout
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this._token.set(null);
  }

  // ✅ Token yoxlama/alma
  isLoggedIn(): boolean { return !!this._token(); }
  getToken(): string | null { return this._token(); }

  // ✅ Cari user (oxuyanda da favoritləri sabitlə)
  getCurrentUser(): User | null {
    const data = localStorage.getItem('current_user');
    if (!data) return null;
    const u: User = JSON.parse(data);
    const fav = this.normalizeFavorites((u as any).favorites ?? []);
    if (JSON.stringify(fav) !== JSON.stringify(u.favorites)) {
      return this.persistUser({ ...u, favorites: fav });
    }
    return u;
  }

  // ✅ Favorit toggle (lokal user-dən oxu → yenilə → PUT → localStorage-ı sync et)
  toggleFavorite(userId: string, carId: string | number, isFavorite: boolean): Observable<User> {
    const user = this.getCurrentUser();
    if (!user) return throwError(() => new Error('Not logged in'));

    const carIdStr = String(carId);
    const current = this.normalizeFavorites(user.favorites);
    const updatedFavorites = isFavorite
      ? current.filter(id => id !== carIdStr)
      : [...current, carIdStr];

    const updatedUser: User = { ...user, favorites: updatedFavorites };

    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser).pipe(
      map(u => this.persistUser(u)) // serverdən gələn cavabı da normalizə edib yaddaşa yaz
    );
  }

  // ✅ Rol
  getRole(): string | null {
    const u = this.getCurrentUser();
    return u?.role ?? null;
  }
}
