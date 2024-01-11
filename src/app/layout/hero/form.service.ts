// form.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private isFormValid = false;

  setFormValidity(isValid: boolean) {
    this.isFormValid = isValid;
  }

  getFormValidity() {
    return this.isFormValid;
  }
}