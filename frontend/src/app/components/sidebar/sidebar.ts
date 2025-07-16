import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  @Input() sidebarClosed = true;

  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
    this.sidebarToggle.emit(this.sidebarClosed);
  }
}
