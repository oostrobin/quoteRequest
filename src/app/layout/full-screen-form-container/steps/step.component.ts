import { FormService } from './../../../shared/services/form-service/form.service';
import { MatInputModule } from '@angular/material/input';
import { Component, Input } from '@angular/core';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [
    ValidationErrorComponent,
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
})
export class StepComponent {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() stepIndex: number = 0;

  constructor(private formService: FormService) {
  }

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
