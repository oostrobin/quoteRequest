import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { FieldConfig } from '../../layout/full-screen-form-container/steps/config/form.config';

@Injectable({ providedIn: 'root' })
export class FormMapperService {
  mapFieldToControl(field: FieldConfig): FormControl | FormGroup | FormArray { // Flexible return type
    switch (field.type) {
      case 'text':
        return new FormControl('', field.validators || []);
      case 'email':
        return new FormControl('', field.validators || []);
      case 'number':
        return new FormControl('', field.validators || []);
      case 'select': 
        return new FormControl('', field.validators || []);
      default: 
        return new FormControl('', field.validators || []);
    }
  }
}
