import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../../models/post';

import { NotificationService } from './notification.service';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiBase}/cars`;

  constructor(private http: HttpClient, private notify: NotificationService) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      catchError(err => {
        this.notify.showError('Məlumatlar yüklənmədi');
        return throwError(() => err);
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        this.notify.showError('Əlavə məlumat tapılmadı');
        return throwError(() => err);
      })
    );
  }

  addPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post).pipe(
      catchError(err => {
        this.notify.showError('Yeni elan əlavə edilmədi');
        return throwError(() => err);
      })
    );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        this.notify.showError('Elan silinmədi');
        return throwError(() => err);
      })
    );
  }
}
