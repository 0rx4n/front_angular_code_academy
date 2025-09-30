import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class Header implements OnInit {
  menuOpen = signal(false);
  currentUser: User | null = null;
  welcomeMessage: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      if (this.currentUser.role === 'role 1') {
        this.welcomeMessage = `Xoş gəldin ${this.currentUser.name}, siz ADMİNSİNİZ!`;
      } else {
        this.welcomeMessage = `Xoş gəldin ${this.currentUser.name}`;
      }
    }
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
