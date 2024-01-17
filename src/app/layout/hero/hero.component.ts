import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {


  
  
}
