import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Chat } from './pages/chat/chat';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [{ path: '', component: Landing },
    { path: 'chat', component: Chat }
];
