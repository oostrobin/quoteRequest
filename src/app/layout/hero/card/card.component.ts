import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormContainerComponent } from '../form-container/form-container.component';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FormContainerComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

}
