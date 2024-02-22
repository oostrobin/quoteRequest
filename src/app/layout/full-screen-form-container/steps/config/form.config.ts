import { ValidatorFn, Validators } from "@angular/forms";

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'password' | 'textarea' | 'checkbox' | 'radio' | 'select'; 
  placeholder?: string; 
  validators?: ValidatorFn[];
  options?: { value: any, label: string }[]; 
}

export interface StepConfig {
  stepTitle: string;
  fields: FieldConfig[];
}

export type FormConfig = StepConfig[];

export const FORM_CONFIG : FormConfig = [
  {
    stepTitle: 'Address Information',
    fields: [
      {
        name: 'value', 
        label: 'Field Label', 
        type: 'text',
        placeholder: 'Enter Value', 
        validators: [Validators.required]
      },
    ]
  },
  {
    stepTitle: 'Contact Details',
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        validators: [Validators.required, Validators.email]
      }
    ]
  }
];