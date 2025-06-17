import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="ml-64 p-8">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .main-content {
        padding: 2rem;
      }
    `,
  ],
})
export class App {
  title = 'SageMedic AI';
}
