import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'income',
    loadComponent: () => import('./pages/income/income.page').then( m => m.IncomePage)
  },
];
