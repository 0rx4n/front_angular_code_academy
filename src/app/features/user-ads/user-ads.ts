// import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { PostService } from '../../core/services/post.service';
// import { Post } from '../../models/post';
// import { Observable, of } from 'rxjs';
// import { switchMap, map } from 'rxjs/operators';
// import { CarCard } from '../../shared/components/car-card/car-card';

// @Component({
//   selector: 'app-user-ads',
//   standalone: true,
//   imports: [CommonModule, CarCard],
//   templateUrl: './user-ads.html',
//   styleUrls: ['./user-ads.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class UserAds implements OnInit {
//   ads$!: Observable<Post[]>;

//   constructor(
//     private route: ActivatedRoute,
//     private postService: PostService
//   ) {}

//   ngOnInit(): void {
//     this.ads$ = this.route.paramMap.pipe(
//       switchMap(params => {
//         const userId = params.get('id');
//         if (!userId) return of([]);
//         return this.postService.getPosts().pipe(
//           map(posts => posts.filter(p => p.ownerId === userId))
//         );
//       })
//     );
//   }
// }


import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { CarGrid } from '../../shared/components/car-grid/car-grid';

@Component({
  selector: 'app-user-ads',
  standalone: true,
  imports: [CommonModule, CarGrid],
  templateUrl: './user-ads.html',
  styleUrls: ['./user-ads.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAds {
  user$!: Observable<User | null>;
  posts$!: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        const userId = params.get('id');
        if (!userId) return of(null);
        return this.authService.getUserById(userId);
      })
    );

    this.posts$ = this.route.paramMap.pipe(
      switchMap(params => {
        const userId = params.get('id');
        if (!userId) return of([]);
        return this.postService.getPosts().pipe(
          map(posts => posts.filter(p => String(p.ownerId) === userId))
        );
      })
    );
  }
}
