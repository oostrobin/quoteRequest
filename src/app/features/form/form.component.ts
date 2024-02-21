import { Component } from '@angular/core';
import { StepperComonentVertical } from './stepper/stepper.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [StepperComonentVertical],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

}
