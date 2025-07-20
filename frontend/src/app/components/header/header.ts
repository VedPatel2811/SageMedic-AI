import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
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
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    // subscribe to user profile
    this.auth.user$.subscribe(profile => {
      this.user = profile;
    });
  }

  goToHome(){
    this.router.navigate(['/']);
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  onAvatarClick(){
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  onAvatarBlur(){
    this.profileMenuOpen=false;
  }
}
