import { Component, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet
  ]
})
export class App {
  

  protected title = 'SageMedic AI';

  
}
