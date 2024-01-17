import { Validators } from "@angular/forms";

export type FormConfigIndex = {
    [key: string]: FormControlConfig;
  };

export interface FormControlConfig {
  initialValue: any;
  validators: any[];
}

export interface FormConfig {
  [key: string]: FormControlConfig;
}

export const FORM_CONFIG = {
  postalCode: {
    initialValue: '',
    validators: [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]{4}[A-Za-z]{2}$'),
    ],
  },
  houseNumber: {
    initialValue: '',
    validators: [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[0-9]*$'),
    ],
  },
  addition: {
    initialValue: '',
    validators: [],
  },
};