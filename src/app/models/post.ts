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


export interface Post {
  id: string;          // MockAPI-də id həmişə string olur
  marka: string;
  model: string;
  city: string;
  ban: string;
  year: string;
  price: number;
  image: string;
  ownerId: string;     // elan sahibi user id
  createdAt: string;   // tarix
}
