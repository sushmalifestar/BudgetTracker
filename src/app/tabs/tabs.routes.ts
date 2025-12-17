import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../dashboard/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'expenses',
        loadComponent: () =>
          import('../expenses/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../categories/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'settings',
        loadComponent:()=>
          import('../settings/settings.page').then((m)=>m.SettingsPage),

      },
      {
        path: 'income',
        loadComponent:()=>
          import('../pages/income/income.page').then((m)=>m.IncomePage),

      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full',
  },
];
