import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  template: `
    <a [routerLink]="['/cars', post.id]" class="block cursor-pointer">
      <div class="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
        <!-- Şəkil -->
        <div class="relative w-full overflow-hidden">
          <div class="pt-[56%]"></div>
          <img [src]="post.image" alt="car"
               class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>

        <!-- Məlumat -->
        <div class="bg-white p-4">
          <h2 class="font-semibold text-gray-800 text-sm md:text-base">
            {{ post.marka }} {{ post.model }}
          </h2>
          <p class="text-gray-600 text-sm">
            {{ post.city }} • {{ post.year }} • {{ post.ban }}
          </p>
          <p class="text-lg font-bold text-blue-600 mt-1">
            {{ post.price | currency:'USD' }}
          </p>
        </div>
      </div>
    </a>
  `,
  styles: [`
    :host { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarCard {
  @Input() post!: Post;
}
