import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../../models/user';
import { NotificationService } from './notification.service';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBase}/users`;
  private _token = signal<string | null>(localStorage.getItem('auth_token'));

  constructor(private http: HttpClient, private notify: NotificationService) {}

  private normalizeFavorites(arr: any): string[] {
    if (!Array.isArray(arr)) return [];
    return Array.from(new Set(arr.map((x: any) => String(x))));
  }

  private persistUser(u: User) {
    const normalized = {
      ...u,
      favorites: this.normalizeFavorites((u as any).favorites),
    };
    localStorage.setItem('current_user', JSON.stringify(normalized));
    return normalized;
  }

  // ✅ Register
  register(user: Omit<User, 'role'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, { ...user, favorites: [] }).pipe(
      tap(() => this.notify.showSuccess('Qeydiyyat uğurla tamamlandı')),
      catchError((err) => {
        this.notify.showError('Qeydiyyat zamanı xəta baş verdi');
        return throwError(() => err);
      })
    );
  }

  // ✅ Login
  login(login: string, parol: string): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const found = users.find((u) => u.login === login);
        if (!found) throw new Error('İstifadəçi tapılmadı');
        if (found.parol !== parol) throw new Error('Şifrə səhvdir');

        const normalized = this.persistUser(found);
        if (normalized.token) {
          localStorage.setItem('auth_token', normalized.token);
          this._token.set(normalized.token);
        }
        this.notify.showSuccess(`Xoş gəldin ${normalized.name}`);
        return normalized;
      }),
      catchError((err) => {
        this.notify.showError('Daxil olma zamanı xəta baş verdi');
        return throwError(() => err);
      })
    );
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this._token.set(null);
    sessionStorage.clear();
    this.notify.showInfo('Çıxış etdiniz');
  }

  isLoggedIn(): boolean {
    return !!this._token();
  }
  getToken(): string | null {
    return this._token();
  }

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
  toggleFavorite(userId: string, carId: string | number): Observable<User> {
    const user = this.getCurrentUser();
    if (!user) return throwError(() => new Error('Giriş edilməyib'));

    const carIdStr = String(carId);
    const current = this.normalizeFavorites(user.favorites);

    const updatedFavorites = current.includes(carIdStr)
      ? current.filter((id) => id !== carIdStr)
      : [...current, carIdStr];

    const updatedUser: User = { ...user, favorites: updatedFavorites };

    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser).pipe(
      map((u) => this.persistUser(u)),
      catchError((err) => {
        this.notify.showError('Favorit siyahısı yenilənmədi');
        return throwError(() => err);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      tap((updated) => {
        this.persistUser(updated);
        this.notify.showSuccess('Profil məlumatları yeniləndi');
      }),
      catchError((err) => {
        this.notify.showError('Profil yenilənmədi');
        return throwError(() => err);
      })
    );
  }

  getUserById(userId: string): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/${userId}`);
}


  getRole(): string | null {
    const u = this.getCurrentUser();
    return u?.role ?? null;
  }
}
