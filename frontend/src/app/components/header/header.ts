import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.html',
})
export class Header {
  user: any;
  profileMenuOpen = false;

  @ViewChild('avatarButton') avatarButton!: ElementRef;
  @ViewChild('profileMenu') profileMenu!: ElementRef;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.user$.subscribe((profile) => {
      this.user = profile;
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  onAvatarClick(event: MouseEvent) {
    event.stopPropagation();
    this.profileMenuOpen = true;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInsideAvatar = this.avatarButton?.nativeElement.contains(event.target);
    const clickedInsideMenu = this.profileMenu?.nativeElement.contains(event.target);

    if (!clickedInsideAvatar && !clickedInsideMenu) {
      this.profileMenuOpen = false;
    }
  }
}
