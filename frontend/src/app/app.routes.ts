import { Routes } from '@angular/router';
import { Home } from './home/home';
//import { SettingsComponent } from './settings/settings';
//import { AboutComponent } from './about/about';

export const routes: Routes = [
    { path: '', component: Home },
  //{ path: 'settings', component: SettingsComponent },
  //{ path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
