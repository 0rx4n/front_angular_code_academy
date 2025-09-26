// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// export interface Post {
//   name: string;
//   price: number;
//   image: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {
//   private apiUrl = 'https://fakestoreapi.com/products';

//   constructor(private http: HttpClient) {}

//   getPosts(): Observable<Post[]> {
//     return this.http.get<any[]>(this.apiUrl).pipe(
//       map(products =>
//         products.map(p => ({
//           name: p.title,
//           price: p.price,
//           image: p.image
//         }))
//       )
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  marka: string;
  model: string;
  city: string;
  price: number;
  year: string;
  ban: string;
  image: string;
}

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
