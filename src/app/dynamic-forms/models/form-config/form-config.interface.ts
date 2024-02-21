import { ValidatorFn } from "@angular/forms";

export interface FormField {
  value: any;
  validators?: ValidatorFn | ValidatorFn[];
  label: string;
  type: string;
}

export interface FormConfig {
  [step: string]: {
    [field: string]: FormField;
  };
}