import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'validation-error-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './validation-error.component.html',
  styleUrl: './validation-error.component.scss'
})
export class ValidationErrorComponent {
  @Input() message: string = '';
  @Input() icon: string = 'error_outline';
}
