// src/app/pages/register/register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  success: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    if (!this.name || !this.email || !this.password) {
      this.error = 'Bütün xanaları doldurun!';
      this.success = '';
      return;
    }

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (res) => {
        this.success = 'Qeydiyyat uğurla tamamlandı!';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.error = 'Qeydiyyat zamanı xəta baş verdi!';
        this.success = '';
      },
    });
  }

  closeRegister() {
    this.router.navigate(['/']); // X düyməsi ilə home səhifəsinə qayıdır
  }
}
