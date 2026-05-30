import { Routes } from '@angular/router';
import { authGuard } from './authentication/guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'startup',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'register',
    loadComponent: () => import('./authentication/pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./authentication/pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'startup',
    loadComponent: () => import('./authentication/pages/startup/startup.page').then( m => m.StartupPage)
  },

];
