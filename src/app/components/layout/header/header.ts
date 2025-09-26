import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class Header {
  menuOpen = signal(false);

  constructor(public authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
