import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@auth0/auth0-angular'; // ensure you have this

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  @Input() sidebarClosed = true;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  auth = inject(AuthService);
  user$ = this.auth.user$;

  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
    this.sidebarToggle.emit(this.sidebarClosed);
  }
}
