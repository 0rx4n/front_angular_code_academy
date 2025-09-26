import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class Login {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    if (!this.email || !this.password) {
      this.error = 'Email və şifrə daxil edin!';
      return;
    }

    // AuthService login funksiyasını düzgün çağırırıq
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Logged in:', res);
        this.router.navigate(['/']); // login sonrası home page
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.error = 'İstifadəçi adı və ya şifrə səhvdir!';
      },
    });
  }

  closeLogin() {
    // X düyməsi kliklənəndə guest olaraq home page-ə yönləndirir
    this.router.navigate(['/']);
  }
}
