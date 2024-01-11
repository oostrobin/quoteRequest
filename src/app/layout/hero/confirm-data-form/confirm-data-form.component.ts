import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-data-form',
  standalone: true,
  imports: [],
  templateUrl: './confirm-data-form.component.html',
  styleUrl: './confirm-data-form.component.scss'
})
export class ConfirmDataFormComponent {
  postcode: string = '';
  huisnummer: string = '';
  toevoeging: string = '';
}
