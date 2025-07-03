import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { SettingsComponent } from './components/settings/settings';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
