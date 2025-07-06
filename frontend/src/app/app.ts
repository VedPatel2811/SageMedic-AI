import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  imports: [
    HttpClientModule,
    CommonModule,
    
  ]
})
export class App {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  protected title = 'frontend';

  loginWithRedirect(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: window.location.pathname,
      },
    });
  }

  logout(): void {
    this.auth.logout({ 
      logoutParams: {
        returnTo: this.doc.location.origin 
      }
    });
  }
}
