// import { Routes } from '@angular/router';
// import { Home } from './features/home/home';
// import { About } from './features/about/about';
// import { Login } from './features/login/login';
// import { Register } from './features/register/register';
// import { Layout } from './shared/components/layout/layout';
// import { CarDetail } from './features/car-detail/car-detail';
// import { authGuard } from './core/guards/auth.guard';

// export const routes: Routes = [
//   {
//     path: '',
//     component: Layout,
//     children: [
//       { path: '', component: Home },
//       { path: 'about', component: About },
//       { path: 'cars/:id', component: CarDetail },
//       {
//         path: 'favorites',
//         canActivate: [authGuard], // ✅ yalnız login olan user görə bilsin
//         loadComponent: () =>
//           import('./features/favorites/favorites').then(m => m.Favorites)
//       },
//       { 
//     path: 'user/:id/ads',
//     loadComponent: () => import('./features/user-ads/user-ads').then(m => m.UserAds)
//   }
//     ]
//   },
//   { path: 'login', component: Login },
//   { path: 'register', component: Register },
//   { 
//     path: 'add-car', 
//     canActivate: [authGuard], 
//     loadComponent: () => import('./features/add-car/add-car').then(m => m.AddCar) 
//   },
    
//   // fallback (404 üçün)
//   { path: '**', redirectTo: '' }
// ];

import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Layout } from './shared/components/layout/layout';
import { CarDetail } from './features/car-detail/car-detail';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'cars/:id', component: CarDetail },

      // ✅ Seçilmişlər
      {
        path: 'favorites',
        canActivate: [authGuard], // yalnız login olanda açılır
        loadComponent: () =>
          import('./features/favorites/favorites').then(m => m.Favorites)
      },

      // ✅ İstifadəçinin digər elanları
      {
        path: 'user/:id/ads',
        loadComponent: () =>
          import('./features/user-ads/user-ads').then(m => m.UserAds)
      }
    ]
  },

  // ✅ Auth
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // ✅ Yeni elan
  {
    path: 'add-car',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/add-car/add-car').then(m => m.AddCar)
  },

  // ✅ 404 fallback
  { path: '**', redirectTo: '' }
];
