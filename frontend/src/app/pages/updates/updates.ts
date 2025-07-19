import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-updates',
  imports: [Header, Footer, MatIconModule],
  templateUrl: './updates.html',
  styleUrl: './updates.css',
})
export class Updates {
}
