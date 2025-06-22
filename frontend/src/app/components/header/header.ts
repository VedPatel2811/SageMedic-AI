import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './header.html',
})
export class HeaderComponent {
  navItems = [
    {
      label: 'Home',
      path: '/',
      matIcon: 'home',
    },
    {
      label: 'Check Symptoms',
      path: '/check-symptoms',
      matIcon: 'medical_services',
    },
    {
      label: 'History',
      path: '/history',
      matIcon: 'history',
    },
    {
      label: 'Settings',
      path: '/settings',
      matIcon: 'settings',
    },
    {
      label: 'About',
      path: '/about',
      matIcon: 'info',
    },
  ];
}
