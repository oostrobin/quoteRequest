import { ErrorService } from './../../../shared/services/error-service/error.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'form-step-one',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './initial-form-step.component.html',
  styleUrl: './initial-form-step.component.scss',
})
export class InitialFormStepComponent {
  addressForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  initializeForm() {
    this.addressForm = this.formBuilder.group({
      postalCode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]{4}[A-Za-z]{2}$'),
        ],
      ],
      houseNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      addition: [''],
      
    }, { updateOn: 'blur' });

    
  }

  private subscribeToFormChanges() {
    Object.keys(this.addressForm.controls).forEach((controlName) => {
      const control = this.addressForm.get(controlName);
      if (control) {
        control.statusChanges.subscribe(() => {
          if (control) {
            const isValid = control.valid;
            if (!isValid) {
              this.updateErrorService();
            } else {
              this.errorService.removeErrorForField(controlName);
            }
          }
        });
      }
    });
  }

  private updateErrorService() {
    Object.keys(this.addressForm.controls).forEach((controlName) => {
      const control = this.addressForm.get(controlName);
      if (control && control.errors && (control.dirty || control.touched)) {
        const errors = control.errors ? Object.keys(control.errors) : [];
        this.errorService.addErrorsForField(controlName, errors);
      } else {
        this.errorService.removeErrorForField(controlName);
      }
    });
  }
}
