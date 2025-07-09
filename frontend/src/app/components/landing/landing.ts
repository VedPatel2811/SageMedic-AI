import { Component, DOCUMENT, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RedirectCommand } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
})
export class Landing {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  loginWithRedirect(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: "http://localhost:4200/chat",
      },
    });
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}
