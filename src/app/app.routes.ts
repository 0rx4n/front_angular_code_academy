
import { Route, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Layout } from './components/layout/layout';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register'; // ✅ yeni əlavə

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About }
    ]
  },
  { path: 'login', component: Login },
  { path: 'register', component: Register } // ✅ qeydiyyat route-u
];
