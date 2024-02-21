import { Component, Input } from '@angular/core';

@Component({
  selector: 'checkbox-input',
  standalone: true,
  imports: [],
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.scss'
})
export class CheckboxInputComponent {
  @Input() checkboxLabel = "";
}
