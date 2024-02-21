import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { FormService } from '../../../shared/services/form-service/form.service';
import { JsonPipe } from '@angular/common';
import { ValidationErrorComponent } from '../../../layout/full-screen-form-container/validation-error/validation-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseInputComponent } from '../base-input/base-input.component';
import { CheckboxInputComponent } from '../checkbox-input/checkbox-input.component';

@Component({
  selector: 'dynamic-form-field',
  standalone: true,
  imports: [
    ValidationErrorComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BaseInputComponent,
    JsonPipe,
    CheckboxInputComponent
],
  templateUrl: './dynamic-form-field.component.html',
  styleUrl: './dynamic-form-field.component.scss',
})
export class DynamicFormFieldComponent {
  @Input() stepIndex: number = 0;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private formService: FormService) {}

  getFormFieldType(field: string) {
    return this.formService.getFieldType(field);
  }

  get formControlNames(): string[] {
    return this.formService.formControlNames;
  }

  getLabel(controlName: string): string {
    return this.formService.getFormControlLabel(controlName);
  }


}
