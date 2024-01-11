
import { Component } from '@angular/core';
import { HeroComponent } from '../../hero/hero.component';
import { MainToolbar } from '../../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainToolbar, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
