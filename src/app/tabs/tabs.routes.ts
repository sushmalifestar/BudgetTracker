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
          import('../pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'expenses',
        loadComponent: () =>
          import('../pages/expenses/expenses.page').then((m) => m.ExpensePage),
      },
      {
        path: 'savings',
        loadComponent: () =>
          import('../pages/savings/savings.page').then((m) => m.SavingsPage),
      },
      {
        path: 'settings',
        loadComponent:()=>
          import('../pages/settings/settings.page').then((m)=>m.SettingsPage),

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
