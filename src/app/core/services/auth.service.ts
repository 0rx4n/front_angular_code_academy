import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
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
    return Array.from(new Set(arr.map((x: any) => String(x))));
  }

  private persistUser(u: User) {
    const normalized = { ...u, favorites: this.normalizeFavorites((u as any).favorites) };
    localStorage.setItem('current_user', JSON.stringify(normalized));
    return normalized;
  }

  // ✅ Register
  register(user: Omit<User, 'role'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, {
      ...user,
      favorites: []
    }).pipe(
      tap((res) => console.log('Registered user:', res))
    );
  }

  // ✅ Login
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

  // ✅ Token
  isLoggedIn(): boolean { return !!this._token(); }
  getToken(): string | null { return this._token(); }

  // ✅ Cari user
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

  // ✅ Favorit toggle
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
      map(u => this.persistUser(u))
    );
  }

  // ✅ User update (ads, profile və s. üçün istifadə olunacaq)
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      tap(updated => {
        this.persistUser(updated);
      })
    );
  }

  // ✅ Rol
  getRole(): string | null {
    const u = this.getCurrentUser();
    return u?.role ?? null;
  }
}
