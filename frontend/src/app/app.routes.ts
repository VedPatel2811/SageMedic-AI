import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: '**', redirectTo: '' },
];
