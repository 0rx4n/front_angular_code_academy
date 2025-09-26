// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { PostService, Post } from '../../services/post';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.html',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
// })
// export class Home implements OnInit {
//   posts: Post[] = [];
//   filteredPosts: Post[] = [];

//   // Əsas filterlər
//   marka: string = '';
//   model: string = '';
//   seher: string = '';
//   minPrice: number | null = null;
//   maxPrice: number | null = null;
//   banNovu: string = '';
//   minIl: number | null = null;
//   maxIl: number | null = null;

//   // Əlavə filterlər
//   reng: string = '';
//   muharikHecmi: number | null = null;
//   oturucu: string = '';
//   suretQutusu: string = '';
//   yanacaq: string = '';
//   atGucu: number | null = null;
//   yurush: number | null = null;

//   // Toggle
//   showMoreFilters = false;

//   constructor(private postService: PostService) {}

//   ngOnInit(): void {
//     this.postService.getPosts().subscribe((data) => {
//       this.posts = data;
//       this.filteredPosts = data;
//     });
//   }

//   toggleFilters(): void {
//     this.showMoreFilters = !this.showMoreFilters;
//   }

//   applyFilters(): void {
//     this.filteredPosts = this.posts.filter((post) => {
//       const meetsPriceMin = this.minPrice == null || post.price >= this.minPrice;
//       const meetsPriceMax = this.maxPrice == null || post.price <= this.maxPrice;
//       const meetsMarka = !this.marka || post.name.toLowerCase().includes(this.marka.toLowerCase());
//       return meetsPriceMin && meetsPriceMax && meetsMarka;
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <-- HttpClientModule əlavə olunur
import { PostService, Post } from '../../services/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // <-- HttpClientModule burada
})
export class Home implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];

  // Əsas filterlər
  marka: string = '';
  model: string = '';
  seher: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  banNovu: string = '';
  minIl: number | null = null;
  maxIl: number | null = null;

  // Əlavə filterlər
  reng: string = '';
  muharikHecmi: number | null = null;
  oturucu: string = '';
  suretQutusu: string = '';
  yanacaq: string = '';
  atGucu: number | null = null;
  yurush: number | null = null;

  // Toggle
  showMoreFilters = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      // MockAPI-dən gələn data ilə işləyirik
      this.posts = data;
      this.filteredPosts = data;
    });
  }

  toggleFilters(): void {
    this.showMoreFilters = !this.showMoreFilters;
  }

  applyFilters(): void {
    this.filteredPosts = this.posts.filter((post) => {
      const meetsPriceMin = this.minPrice == null || post.price >= this.minPrice;
      const meetsPriceMax = this.maxPrice == null || post.price <= this.maxPrice;
      const meetsMarka = !this.marka || post.marka.toLowerCase().includes(this.marka.toLowerCase());
      const meetsModel = !this.model || post.model.toLowerCase().includes(this.model.toLowerCase());
      const meetsSeher = !this.seher || post.city.toLowerCase().includes(this.seher.toLowerCase());
      return meetsPriceMin && meetsPriceMax && meetsMarka && meetsModel && meetsSeher;
    });
  }
}
