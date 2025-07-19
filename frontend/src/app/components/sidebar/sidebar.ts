import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular'; // ensure you have this

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  goToUpdates(){
    this.router.navigate(['/updates']);
  }
  @Input() sidebarClosed = true;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  auth = inject(AuthService);
  user$ = this.auth.user$;

  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
    this.sidebarToggle.emit(this.sidebarClosed);
  }
}
