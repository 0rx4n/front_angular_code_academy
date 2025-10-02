import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarGrid } from '../../shared/components/car-grid/car-grid';
import { Post } from '../../models/post';
import { AuthService } from '../../core/services/auth.service';
import { PostService } from '../../core/services/post.service';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CarGrid],
  template: `
    <div class="mx-auto w-full max-w-[1200px] py-6">
      <h1 class="text-2xl font-bold mb-4">Seçilmişlər</h1>

      <ng-container *ngIf="favorites$ | async as favs; else loading">
        <ng-container *ngIf="favs.length > 0; else empty">
          <app-car-grid [posts]="favs"></app-car-grid>
        </ng-container>
      </ng-container>

      <ng-template #loading>
        <p class="text-gray-500">Yüklənir...</p>
      </ng-template>

      <ng-template #empty>
        <p class="text-gray-500">Seçilmiş elan yoxdur.</p>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Favorites implements OnInit {
  favorites$!: Observable<Post[]>;

  constructor(private auth: AuthService, private posts: PostService) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (!user?.favorites || user.favorites.length === 0) {
      this.favorites$ = of([]);
      return;
    }

    // backend-dən favoritləri yüklə
    const requests = user.favorites.map((id) =>
      this.posts.getPostById(id).pipe(catchError(() => of(null)))
    );

    this.favorites$ = forkJoin(requests).pipe(
      map(results => results.filter((p): p is Post => p !== null))
    );
  }
}
