
import { Route, Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Layout } from './shared/components/layout/layout';
import { CarDetail } from './features/car-detail/car-detail';


export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'cars/:id', component: CarDetail }

    ]
  },
  { path: 'login', component: Login },
  { path: 'register', component: Register } 
];
