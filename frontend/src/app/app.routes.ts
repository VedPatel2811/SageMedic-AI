import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Landing } from './components/landing/landing';
//import { SettingsComponent } from './settings/settings';
//import { AboutComponent } from './about/about';

export const routes: Routes = [
    { path: '', component: Landing },
  //{ path: 'settings', component: SettingsComponent },
  //{ path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
