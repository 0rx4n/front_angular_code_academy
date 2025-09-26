import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  // MockAPI endpoint-inizi buraya yapışdırın
  private apiUrl = 'https://68d5481be29051d1c0adff01.mockapi.io/cardata/cars';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }
}
