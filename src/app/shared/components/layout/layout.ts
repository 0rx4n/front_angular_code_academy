
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Header } from '../layout/header/header';
// import { Footer } from '../layout/footer/footer';

// @Component({
//   selector: 'app-layout',
//   imports: [Header, Footer, RouterOutlet],
//   templateUrl: './layout.html',
//   styleUrls: ['./layout.scss']
// })
// export class Layout {}


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../layout/header/header';
import { Footer } from '../layout/footer/footer';
import { NotificationComponent } from '../notification/notification';
@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer,
    NotificationComponent  // 🔑 buraya əlavə edildi
  ]
})
export class Layout {}
