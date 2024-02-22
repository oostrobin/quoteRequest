import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'base-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss'
})
export class BaseInputComponent {
  @Input() control: FormControl = new FormControl();

  get value(): any {
    return this.control.value;
  }

  set value(value: any) {
    this.control.setValue(value);
  }
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() pattern: string = '';
  
}
