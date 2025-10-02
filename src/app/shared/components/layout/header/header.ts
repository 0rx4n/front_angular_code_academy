import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class Header {
  menuOpen = signal(false);

  // 🔑 Login state və user məlumatı avtomatik yenilənsin
  isLoggedIn = computed(() => this.authService.isLoggedIn());
  currentUser = computed(() => this.authService.getCurrentUser());

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get welcomeMessage(): string {
    const user = this.currentUser();
    if (!user) return '';
    return user.role === 'role 1'
      ? `Xoş gəldin ${user.name}, siz ADMİNSİNİZ!`
      : `Xoş gəldin ${user.name}`;
  }
}
