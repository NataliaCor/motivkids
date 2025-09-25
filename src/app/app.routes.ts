import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'alarms',
    loadComponent: () => import('./pages/alarms/alarms.component').then(m => m.AlarmsComponent)
  },
  {
    path: 'activities',
    loadComponent: () => import('./pages/activities/activities.component').then(m => m.ActivitiesComponent)
  },
  {
    path: 'messages',
    loadComponent: () => import('./pages/messages/messages.component').then(m => m.MessagesComponent)
  },
  {
    path: 'support',
    loadComponent: () => import('./pages/support/support.component').then(m => m.SupportComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
