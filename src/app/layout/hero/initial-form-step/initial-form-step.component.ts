import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';

@Component({
  selector: 'form-step-one',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatCardModule ],
  templateUrl: './initial-form-step.component.html',
  styleUrl: './initial-form-step.component.scss'
})
export class InitialFormStepComponent {
   addressForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private formStateService: FormStateService) {
  }

  ngOnInit() {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  initializeForm() {
    this.addressForm = this.formBuilder.group({
      postalCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]*$')]],
      addition: [''],
    });

    this.formStateService.setFormData(this.addressForm);
    this.getInititialFormData();
  }

  getInititialFormData() {
    this.formStateService.formData.subscribe((data) => {
      if(!data) return;
      this.addressForm.patchValue(data);
    });
  }

  subscribeToFormChanges() {
    this.addressForm.valueChanges.subscribe(() => {
      const isValid = this.addressForm.valid;
      this.formStateService.updateFormValidity(isValid);
    });
  }
    
}
