import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post';
import { CarCard } from '../car-card/car-card';

@Component({
  selector: 'app-car-grid',
  standalone: true,
  imports: [CommonModule, CarCard],
  template: `
    <!-- Köhnə dizayna uyğun responsive grid -->
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <app-car-card
        *ngFor="let post of posts; trackBy: trackById"
        [post]="post">
      </app-car-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarGrid {
  @Input() posts: Post[] = [];
  trackById = (_: number, p: Post) => p.id;
}
