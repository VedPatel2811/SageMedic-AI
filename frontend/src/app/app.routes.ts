import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Chat } from './pages/chat/chat';
import { AuthGuard } from '@auth0/auth0-angular';
import { Updates } from './pages/updates/updates';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'chat', component: Chat, canActivate: [AuthGuard]},
  { path: 'updates', component: Updates, canActivate: [AuthGuard] },
];
