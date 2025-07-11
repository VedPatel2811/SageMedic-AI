import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-landing',
  imports: [MatIconModule, Header, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

}
