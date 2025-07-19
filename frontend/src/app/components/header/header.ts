import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }
}
