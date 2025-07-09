import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Chat } from './components/chat/chat';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'chat', component: Chat },
  { path: '**', redirectTo: '' },
];
