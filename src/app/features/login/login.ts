import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class Login {
  login: string = '';
  parol: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    if (!this.login || !this.parol) {
      this.error = 'Login və şifrə daxil edin!';
      return;
    }

    this.authService.login(this.login, this.parol).subscribe({
      next: (res) => {
        if (res) {
          console.log('Logged in:', res);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        if (err.message.includes('tapılmadı')) {
          this.error = 'Belə istifadəçi yoxdur!';
        } else if (err.message.includes('Şifrə')) {
          this.error = 'Şifrə yanlışdır!';
        } else {
          this.error = 'Login zamanı xəta baş verdi!';
        }
      },
    });
  }

  closeLogin() {
    this.router.navigate(['/']);
  }
}
