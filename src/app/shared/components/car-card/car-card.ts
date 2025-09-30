// import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
// import { CommonModule, CurrencyPipe } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { Post } from '../../../models/post';

// @Component({
//   selector: 'app-car-card',
//   standalone: true,
//   imports: [CommonModule, CurrencyPipe, RouterModule],
//   template: `
//     <a [routerLink]="['/cars', post.id]" class="block cursor-pointer">
//       <div class="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
//         <!-- Şəkil -->
//         <div class="relative w-full overflow-hidden">
//           <div class="pt-[56%]"></div>
//           <img [src]="post.image" alt="car"
//                class="absolute inset-0 w-full h-full object-cover" />
//           <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
//         </div>

//         <!-- Məlumat -->
//         <div class="bg-white p-4">
//           <h2 class="font-semibold text-gray-800 text-sm md:text-base">
//             {{ post.marka }} {{ post.model }}
//           </h2>
//           <p class="text-gray-600 text-sm">
//             {{ post.city }} • {{ post.year }} • {{ post.ban }}
//           </p>
//           <p class="text-lg font-bold text-blue-600 mt-1">
//             {{ post.price | currency:'USD' }}
//           </p>
//         </div>
//       </div>
//     </a>
//   `,
//   styles: [`
//     :host { display: block; }
//   `],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class CarCard {
//   @Input() post!: Post;
// }
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Post } from '../../../models/post';
import { AuthService } from '../../../core/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  template: `
    <a [routerLink]="['/cars', post.id]" class="block cursor-pointer relative">
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

    <!-- ❤️ Sevimlilərə əlavə et düyməsi: dairənin hər yerinə klik aktivdir -->
    <button type="button"
            (click)="onFavClick($event)"
            class="absolute top-3 right-3 w-10 h-10 flex items-center justify-center 
                   bg-white rounded-full shadow hover:bg-gray-100 transition z-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
           class="w-6 h-6 select-none"
           [ngClass]="isFav ? 'text-red-500 fill-red-500' : 'text-gray-400 fill-transparent'"
           stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 
                 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 
                 4.5 0 010-6.364z"/>
      </svg>
    </button>
  `,
  styles: [`
    :host { display: block; position: relative; }
    button { cursor: pointer; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarCard {
  @Input() post!: Post;

  isFav = false;
  saving = false;

  constructor(private auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    const pid = String(this.post.id);
    this.isFav = user ? (user.favorites || []).map(String).includes(pid) : false;
  }

  onFavClick(e: MouseEvent) {
    // kart linkinə getməsin və klik yuxarı bubble olmasın
    e.preventDefault();
    e.stopPropagation();

    const user = this.auth.getCurrentUser();
    if (!user || this.saving) return;

    this.saving = true;

    // Optimistic UI: dərhal rəngi dəyiş
    const nextState = !this.isFav;
    this.isFav = nextState;
    this.cdr.markForCheck();

    this.auth.toggleFavorite(user.id!, String(this.post.id), !nextState /* isFavorite before toggle */)
      .subscribe({
        next: (updatedUser) => {
          // serverlə sync oldu — UI state-i serverdən yenilə
          const pid = String(this.post.id);
          this.isFav = (updatedUser.favorites || []).map(String).includes(pid);
          this.saving = false;
          this.cdr.markForCheck();
        },
        error: () => {
          // revert et
          this.isFav = !nextState;
          this.saving = false;
          this.cdr.markForCheck();
        }
      });
  }
}
