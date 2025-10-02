import { Component, OnInit, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, startWith, finalize } from 'rxjs';
import { Post } from '../../models/post';
import { PostService } from '../../core/services/post.service';
import { FilterBar, Filters } from '../../shared/components/filter-bar/filter-bar';
import { CarGrid } from '../../shared/components/car-grid/car-grid';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, FilterBar, CarGrid],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit {
  posts$!: Observable<Post[]>;
  filteredPosts$!: Observable<Post[]>;
  loading = true;   // 🔑 yüklənmə state-i

  marka = '';
  model = '';
  city = '';
  ban = '';
  minYear: number | null = null;
  maxYear: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  markaOptions: string[] = [];
  modelOptions: string[] = [];
  cityOptions: string[] = [];
  banOptions: string[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts().pipe(
      finalize(() => this.loading = false) // 🔑 yüklənmə bitdi
    );

    this.filteredPosts$ = this.posts$.pipe(
      map(posts => {
        this.markaOptions = this.getUniqueValues('marka', posts);
        this.cityOptions  = this.getUniqueValues('city', posts);
        this.banOptions   = this.getUniqueValues('ban', posts);
        this.updateModelOptions(posts);
        return this.filterPosts(posts);
      }),
      startWith([] as Post[])
    );
  }

  private getUniqueValues(field: 'marka' | 'model' | 'city' | 'ban' | 'year', posts: Post[]): string[] {
    return [...new Set(posts.map(p => p[field] as string))].filter(Boolean);
  }

  private updateModelOptions(posts: Post[]) {
    if (this.marka) {
      this.modelOptions = [...new Set(posts.filter(p => p.marka === this.marka).map(p => p.model))];
    } else {
      this.modelOptions = this.getUniqueValues('model', posts);
    }
  }

  onMarkaChange(selectedMarka: string) {
    this.marka = selectedMarka;
    this.model = '';
    this.posts$.subscribe(posts => this.updateModelOptions(posts));
  }

  onApply(f: Filters) {
    this.marka = f.marka ?? '';
    this.model = f.model ?? '';
    this.city = f.city ?? '';
    this.ban = f.ban ?? '';
    this.minYear = f.minYear ?? null;
    this.maxYear = f.maxYear ?? null;
    this.minPrice = f.minPrice ?? null;
    this.maxPrice = f.maxPrice ?? null;

    this.filteredPosts$ = this.posts$.pipe(
      map(posts => this.filterPosts(posts)),
      startWith([] as Post[])
    );
  }

  private filterPosts(posts: Post[]): Post[] {
    return posts.filter((post) => {
      const meetsPriceMin = this.minPrice == null || post.price >= this.minPrice;
      const meetsPriceMax = this.maxPrice == null || post.price <= this.maxPrice;
      const meetsMarka = !this.marka || post.marka.toLowerCase().includes(this.marka.toLowerCase());
      const meetsModel = !this.model || post.model.toLowerCase().includes(this.model.toLowerCase());
      const meetsCity  = !this.city  || post.city.toLowerCase().includes(this.city.toLowerCase());
      const meetsBan   = !this.ban   || post.ban.toLowerCase().includes(this.ban.toLowerCase());
      const meetsYearMin = this.minYear == null || +post.year >= this.minYear;
      const meetsYearMax = this.maxYear == null || +post.year <= this.maxYear;

      return meetsPriceMin && meetsPriceMax &&
             meetsMarka && meetsModel && meetsCity && meetsBan &&
             meetsYearMin && meetsYearMax;
    });
  }
}
