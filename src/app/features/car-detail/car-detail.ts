import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail.html',
  styleUrls: ['./car-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDetail implements OnInit {
  post$!: Observable<Post | null>;
  user$!: Observable<User | null>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) return of(null);
        return this.postService.getPostById(id);
      })
    );

    this.user$ = this.post$.pipe(
      switchMap(post => {
        if (!post?.ownerId) return of(null);   // ✅ ownerId istifadə olunur
        return this.authService.getUserById(post.ownerId);
      })
    );
  }
}
