import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail.html',
  styleUrls: ['./car-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDetail implements OnInit {
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPostById(id).subscribe(data => {
        this.post = data;
      });
    }
  }
}
