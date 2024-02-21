import { ValidatorFn, Validators } from '@angular/forms';

interface FormFieldConfig {
  value: any; 
  validators?: ValidatorFn[];
  label: string;
  type: 'input' | 'tel' | 'email' | 'password' | 'checkbox' | 'select' | 'textarea' | 'radio' | 'date' | 'time' | 'file' | 'number';
  options?: { 
    value: any;
    label: string;
  }[];  
  condition?: { 
    fieldName: string;
    operator: '==' | '!=' | '>' | '<' | '>=' | '<=';
    value: any; 
  };
}

interface FormFieldGroupConfig {
  groupName: string; 
  fields: { 
    [fieldName: string]: FormFieldConfig; 
  };
}

interface FormConfigStep { 
  stepTitle: string; // Title of the form step
  fields: (FormFieldConfig | FormFieldGroupConfig)[]; // Array to hold both field or group
}

export type FormConfig = FormConfigStep[];


export const FORM_CONFIG: FormConfig = [
  {
    stepTitle: 'Personal Information',
    fields: [
      {
        value: '',
        label: 'First Name',
        type: 'input',
        validators: [Validators.required]
      }, 
      {
        value: '',
        label: 'Last Name',
        type: 'input',
        validators: [Validators.required]
      },
    ]
  },
];
