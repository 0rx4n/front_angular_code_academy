// import { Component } from '@angular/core';
// import { Footer } from './footer/footer';
// import { Header } from './header/header';
// import {RouterOutlet} from '@angular/router'

// @Component({
//   selector: 'app-layout',
//   standalone:true,
//   imports: [Header, Footer, RouterOutlet],
//   templateUrl: './layout.html',
//   styleUrl: './layout.scss'
// })
// export class Layout {

// }

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../layout/header/header';
import { Footer } from '../layout/footer/footer';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {}
