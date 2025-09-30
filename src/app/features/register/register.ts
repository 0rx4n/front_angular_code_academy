// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.html',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
// })
// export class Register {
//   login: string = '';
//   parol: string = '';
//   name: string = '';
//   last_name: string = '';
//   phone: string = '';
//   mail: string = '';
//   error: string = '';
//   success: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   registerUser() {
//     if (!this.login || !this.parol || !this.name || !this.last_name || !this.phone || !this.mail) {
//       this.error = 'Bütün xanaları doldurun!';
//       this.success = '';
//       return;
//     }

//     const token = `${this.name}${this.last_name}${this.mail}`; // sadə token generasiyası

//     this.authService.register({
//       login: this.login,
//       parol: this.parol,
//       name: this.name,
//       last_name: this.last_name,
//       phone: this.phone,
//       mail: this.mail,
//       token
//     }).subscribe({
//       next: () => {
//         this.success = 'Qeydiyyat uğurla tamamlandı!';
//         this.error = '';
//         setTimeout(() => this.router.navigate(['/login']), 1500);
//       },
//       error: () => {
//         this.error = 'Qeydiyyat zamanı xəta baş verdi!';
//         this.success = '';
//       },
//     });
//   }

//   closeRegister() {
//     this.router.navigate(['/']); // X düyməsi ilə home səhifəsinə qayıdır
//   }
// }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.html',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
// })
// export class Register {
//   login = '';
//   parol = '';
//   name = '';
//   last_name = '';
//   phone = '';
//   mail = '';
//   error = '';
//   success = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   registerUser() {
//     if (!this.login || !this.parol || !this.name || !this.last_name || !this.phone || !this.mail) {
//       this.error = 'Bütün xanaları doldurun!';
//       this.success = '';
//       return;
//     }

//     const token = `${this.name}-${this.last_name}-${this.mail}`; // sadə token generasiyası

//     this.authService.register({
//       login: this.login,
//       parol: this.parol,
//       name: this.name,
//       last_name: this.last_name,
//       phone: this.phone,
//       mail: this.mail,
//       token
//     }).subscribe({
//       next: () => {
//         this.success = 'Qeydiyyat uğurla tamamlandı!';
//         this.error = '';
//         setTimeout(() => this.router.navigate(['/login']), 1500);
//       },
//       error: () => {
//         this.error = 'Qeydiyyat zamanı xəta baş verdi!';
//         this.success = '';
//       },
//     });
//   }

//   closeRegister() {
//     this.router.navigate(['/']); 
//   }
// }

// // src/app/pages/register/register.ts
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.html',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
// })
// export class Register {
//   login: string = '';
//   parol: string = '';
//   name: string = '';
//   last_name: string = '';
//   phone: string = '';
//   mail: string = '';
//   error: string = '';
//   success: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   registerUser() {
//     if (!this.login || !this.parol || !this.name || !this.last_name || !this.phone || !this.mail) {
//       this.error = 'Bütün xanaları doldurun!';
//       this.success = '';
//       return;
//     }

//     const token = `${this.name}${this.last_name}${this.mail}`; // sadə token generasiyası

//     // ⚠️ role göndərmirik
//     this.authService.register({
//       login: this.login,
//       parol: this.parol,
//       name: this.name,
//       last_name: this.last_name,
//       phone: this.phone,
//       mail: this.mail,
//       token,
//       ads: [],
//       createdAt: new Date().toISOString()
//     }).subscribe({
//       next: () => {
//         this.success = 'Qeydiyyat uğurla tamamlandı!';
//         this.error = '';
//         setTimeout(() => this.router.navigate(['/login']), 1500);
//       },
//       error: () => {
//         this.error = 'Qeydiyyat zamanı xəta baş verdi!';
//         this.success = '';
//       },
//     });
//   }

//   closeRegister() {
//     this.router.navigate(['/']); // X düyməsi ilə home səhifəsinə qayıdır
//   }
// }

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
  login: string = '';
  parol: string = '';
  name: string = '';
  last_name: string = '';
  phone: string = '';
  mail: string = '';
  error: string = '';
  success: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    if (!this.login || !this.parol || !this.name || !this.last_name || !this.phone || !this.mail) {
      this.error = 'Bütün xanaları doldurun!';
      this.success = '';
      return;
    }

    const token = `${this.name}${this.last_name}${this.mail}`; // sadə token generasiyası

    // ✅ favorites əlavə edildi
    this.authService.register({
      login: this.login,
      parol: this.parol,
      name: this.name,
      last_name: this.last_name,
      phone: this.phone,
      mail: this.mail,
      token,
      ads: [],
      favorites: [],   // ✅ boş array ilə başlayırıq
      createdAt: new Date().toISOString()
    }).subscribe({
      next: () => {
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
