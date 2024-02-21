import { Validators } from '@angular/forms';
import { FormConfig } from '../../../../dynamic-forms/models/form-config/form-config.interface';

export const FORM_CONFIG: FormConfig = {
  'Wat zijn uw adresgegevens?': {
    postalCode: {
      value: '',
      validators: Validators.required,
      label: 'Postal Code',
      type: 'input',
    },
    houseNumber: {
      value: '',
      validators: Validators.required,
      label: 'House Number',
      type: 'tel',
    },
    addition: { value: '', label: 'Addition', type: 'input' },
  },
  'Wat zijn uw persoonlijke gegevens?': {
    firstName: {
      value: '',
      validators: Validators.required,
      label: 'First Name',
      type: 'input',
    },
    lastName: {
      value: '',
      validators: Validators.required,
      label: 'Last Name',
      type: 'input',
    },
    email: {
      value: '',
      validators: [Validators.required, Validators.email],
      label: 'Email Address',
      type: 'email',
    },
    phoneNumber: {
      value: '',
      validators: Validators.required,
      label: 'Phone Number',
      type: 'tel',
    },
  },
  'Bedenk een wachtwoord': {
    password: {
      value: '',
      validators: Validators.required,
      label: 'Password',
      type: 'password',
    },
    confirmPassword: {
      value: '',
      validators: Validators.required,
      label: 'Confirm Password',
      type: 'password',
    },
  },
  'Gaat u akkoord met de voorwaarden?': {
    termsAndConditions: {
      value: false,
      validators: Validators.required,
      label: 'I agree to the terms and conditions',
      type: 'checkbox',
    },
  },
};
